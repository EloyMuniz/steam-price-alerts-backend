import axios from "axios";
import SteamRepository from "../repositories/SteamRepository";
import extractUserIdFromToken from "../utils/extractUserID";
import externalAPISteam from "./ExternalAPISteamService";
import { sendEmail } from "../utils/email";
const externalValue = new externalAPISteam()

class SteamService {
    public async saveInfoGames() {
        try {

            //Buscando todos os jogos e seus respectivos ID's da api pública da Steam
            const data = await axios.get('http://api.steampowered.com/ISteamApps/GetAppList/v2/')
            //Filtro para retirar objetos com nomes de jogos com strings vazias
            const quant = data.data.applist.apps.map((value: any) => {

                if (value.name !== "") {
                    return { game_name: value.name, game_id: value.appid }
                }

            }).filter((element: any) => element != undefined)
            await SteamRepository.steamSaveGames(quant)

            return true



        } catch (error) {
            console.error("Erro no serviço:", error);
            throw error
        }

    }
    public async steamFindGameandSavePrice(game_name: string, game_price: number, use_token: string): Promise<any> {
        try {
            const secret = process.env.USERTOKENSECRET;
            if (!secret) {
                throw new Error('Chave secreta não definida. Verifique a variável de ambiente SECRET.');
            }

            const user_id = extractUserIdFromToken(use_token, secret)
            if (!user_id) {
                throw Error
            }

            let data = await SteamRepository.steamFindGame(game_name)
            //Buscar as informações de preço e preço com desconto de um determinado jogo a partir de seu 'game_id'
            const infoPrice: { [key: string]: any } = await externalValue.appdetailsID(data)


            const gameKey: string = Object.keys(infoPrice)[0];
            //Alguns jogos podem não conter a informação de valores
            if (!infoPrice[gameKey].data["price_overview"]) {
                console.error("Não há informação de preços para esse jogo!")
                throw Error
            }
            if (data?.steam_games_uuid) {
                await SteamRepository.steamSavePrice(infoPrice[gameKey].data["price_overview"].initial, infoPrice[gameKey].data["price_overview"].final, data?.steam_games_uuid)
                await SteamRepository.steamSaveUserPrices(user_id, game_price, data?.steam_games_uuid)
            }

            return true

        } catch (error) {
            console.error("Erro no serviço:", error);
            throw error
        }
    }
    public async steamGamesSend(): Promise<any> {
        try {
            // Necessário fazer uma consulta por vez, pois, a steam não possui API pública que retorne uma lista com os valores de todos os jogos de uma só vez
            let gameList: { [key: string]: object[] } = {}
            const values = await SteamRepository.steamGameSetValues()
            await Promise.all(values.map(async (element: { [key: string]: any }) => {
                let infoPrice = await axios.get(`https://store.steampowered.com/api/appdetails?appids=${element["steam_games"]["game_id"]}&cc=br&l=portuguese`)


                if (element['users']["use_email"] in gameList) {

                    gameList[element['users']["use_email"]].push({
                        user_name: element['users']["use_name"],
                        game_name: element['steam_games']["game_name"],
                        game_set_value: element['game_set_value'],
                        game_real_value_formatted: infoPrice.data[element["steam_games"]["game_id"]]["data"]["price_overview"]["final_formatted"],
                        game_real_value: infoPrice.data[element["steam_games"]["game_id"]]["data"]["price_overview"]["final"],
                        game_id: element['steam_games']['game_id']
                    })

                } else {
                    gameList[element['users']["use_email"]] = [{
                        user_name: element['users']["use_name"],
                        game_name: element['steam_games']["game_name"],
                        game_set_value: element['game_set_value'],
                        game_real_value_formatted: infoPrice.data[element["steam_games"]["game_id"]]["data"]["price_overview"]["final_formatted"],
                        game_real_value: infoPrice.data[element["steam_games"]["game_id"]]["data"]["price_overview"]["final"],
                        game_id: element['steam_games']['game_id']
                    }]

                }

            }));

            let value: string
            for (value in gameList) {



                const lengthArray = gameList[value].length
                for (let i = 0; i < lengthArray; i++) {
                    const item: { [key: string]: any } = gameList[value][i]
                    //Comparar valor real do jogo com o que foi setado
                    if (item["game_real_value"] <= item["game_set_value"] * 100) {

                        const email = value
                        const subject = `Atualização de Preço para o Jogo ${item["game_name"]}`

                        const emailBody = `<p>Olá, <strong>${item["user_name"]}</strong>.</p>

                <p>Espero que você esteja bem! Estou entrando em contato para informá-lo sobre o preço atualizado do jogo <strong>${item["game_name"]}</strong>, que você está acompanhando.</p>

                <p>Atualmente, o jogo está disponível por <strong>${item["game_real_value_formatted"]}</strong>. Esse valor foi atualizado com base na loja oficial da <strong>Steam</strong>. No entanto, você havia definido um preço desejado de <strong>R$ ${item["game_set_value"]}</strong> para adquiri-lo.</p>

                <p>Se o preço atual atende às suas expectativas, esta pode ser uma ótima oportunidade para garantir sua cópia! Caso contrário, continuaremos monitorando o preço e avisaremos sempre que houver mudanças.</p>

                <p>Atenciosamente, <br> 
                <strong>Sua equipe de acompanhamento de jogos</strong></p>`


                        await sendEmail(email, emailBody, subject)

                    }
                }




            }

            return true


        } catch (error) {

        }


    }







}

export default new SteamService()



//https://store.steampowered.com/api/appdetails?appids=3256820&cc=br&l=portuguese