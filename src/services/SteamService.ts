import axios from "axios";


class SteamService {
    public async saveInfoGames() {
        try {
            const data = await axios.get('http://api.steampowered.com/ISteamApps/GetAppList/v2/')



        } catch (error) {
            throw error
        }

    }
}

export default new SteamService()