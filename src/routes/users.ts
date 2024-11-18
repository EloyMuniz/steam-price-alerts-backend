import { Router } from "express"
import checkToken from "../middlewares/usertoken"
import UserController from "../controllers/UserController"
const usersRoutes = Router()
usersRoutes.post("/user-register", UserController.userRegister)


export default usersRoutes