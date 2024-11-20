import axios from "axios";
import SteamRepository from "../repositories/SteamRepository";

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
    public async steamFindGame(game_name: string, game_price: number): Promise<any> {
        try {

            const data = await SteamRepository.steamFindGame(game_name)

            const infoPrice = await axios.get(`https://store.steampowered.com/api/appdetails?appids=${data?.game_id}&cc=br&l=portuguese`)

            const gameKey = Object.keys(infoPrice.data)[0];

           
            return infoPrice.data[gameKey].data["price_overview"]


        } catch (error) { }
    }
}

export default new SteamService()



//https://store.steampowered.com/api/appdetails?appids=3256820&cc=br&l=portuguese