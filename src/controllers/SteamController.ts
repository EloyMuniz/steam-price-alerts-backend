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

    public async steamFindGameandSavePrice(req: Request, res: Response): Promise<any> {
        try {
            const { game_name, game_price } = req.body
            const { use_token } = req.params
            const info = await SteamService.steamFindGameandSavePrice(game_name, game_price, use_token)

            if (info) {
                return res.status(200).json({ message: "As informações foram salvas com sucesso!" })
            }

        } catch (error) {

            return res.status(500).json(`Erro no servidor:${error}`)

        }


    }
}



export default new SteamController()