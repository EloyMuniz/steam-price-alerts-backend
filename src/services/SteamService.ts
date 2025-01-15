import axios from "axios";
import SteamRepository from "../repositories/SteamRepository";
import extractUserIdFromToken from "../utils/extractUserID";
import externalAPISteam from "./ExternalAPISteamService";
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
}

export default new SteamService()



//https://store.steampowered.com/api/appdetails?appids=3256820&cc=br&l=portuguese