import UserService from "../services/UserService";
import { Request, Response } from "express";

class UserController {
    public async userRegister(req: Request, res: Response) {
        try {
            const { use_email, use_password, use_name, use_confirm_password } = req.body;

            const result = await UserService.userRegister(
                use_email,
                use_name,
                use_password,
                use_confirm_password
            );

            return res.status(201).json(result);
        } catch (error: any) {
            if (error.statusCode) {
                return res.status(error.statusCode).json({ message: error.message });
            }
            return res.status(500).json({ message: "Erro interno no servidor!" });
        }
    }
}

export default new UserController();
