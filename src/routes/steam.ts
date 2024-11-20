import { Router } from "express"
import checkToken from "../middlewares/usertoken"
import SteamController from "../controllers/SteamController"

const steamRouter = Router()
steamRouter.get('/steam-game-save-info', SteamController.steamSaveGames)




export default steamRouter