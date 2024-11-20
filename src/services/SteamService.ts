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
}

export default new SteamService()