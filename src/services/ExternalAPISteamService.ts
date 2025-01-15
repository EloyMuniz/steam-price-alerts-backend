import axios from "axios";
import { SteamGame } from "../repositories/SteamRepository";


export default class externalAPISteam {
    public async appdetailsID(data: SteamGame): Promise<object> {
        try {

            const infoPrice = await axios.get(`https://store.steampowered.com/api/appdetails?appids=${data?.game_id}&cc=br&l=portuguese`)
            return infoPrice.data

        } catch (error) {
            throw error
        }

    }

}
