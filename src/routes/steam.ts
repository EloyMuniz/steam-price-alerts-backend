import { Router } from "express"
import checkToken from "../middlewares/usertoken"
import SteamController from "../controllers/SteamController"

const steamRouter = Router()
// steamRouter.get('/steam-game-save-info', checkToken, SteamController.steamSaveGames)
steamRouter.post('/steam-info-id/:use_token', checkToken, SteamController.steamFindGameandSavePrice)
steamRouter.get('/teste', SteamController.teste)
export default steamRouter