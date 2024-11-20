import SteamService from "../services/SteamService";
import { Request, Response } from "express";

class SteamController {

    public async steamSaveGames(req: Request, res: Response): Promise<any> {
        try {
            const info = await SteamService.saveInfoGames()

            if (info) {
                return res.status(200).json({ message: "Dados salvos com sucesso!" })
            }

        } catch (error) {

            return res.status(500).json(`Erro no servidor:${error}`)

        }


    }





}

export default new SteamController()