import { Router } from "express"
import checkToken from "../middlewares/usertoken"
import SteamController from "../controllers/SteamController"

const steamRouter = Router()
steamRouter.get('/steam-game-save-info', checkToken, SteamController.steamSaveGames)
steamRouter.post('/steam-info-id', checkToken, SteamController.steamFindGame)
export default steamRouter