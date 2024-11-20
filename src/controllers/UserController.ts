
import UserService from "../services/UserService";
import { Request, Response } from "express";

class UserController {
    public userRegister = async (req: Request, res: Response): Promise<any> => {
        try {
            const { use_email, use_password, use_name, use_confirm_password } = req.body;

            await UserService.userRegister(
                use_email,
                use_name,
                use_password,
                use_confirm_password
            );

            return res.status(201).json({ message: "O usuário foi cadastrado com sucesso!" });
        } catch (error: any) {
            if (error.statusCode) {
                return res.status(error.statusCode).json({ message: error.message });
            }
            return res.status(500).json({ message: "Erro interno no servidor!" });
        }
    }
    public async userLogin(req: Request, res: Response): Promise<any> {
        try {
            const { use_email, use_password } = req.body
            const result = await UserService.userLogin(use_email, use_password)

            return res.status(200).json(result)

        } catch {
            return res.status(500).json({ message: "Erro interno do servidor!" })
        }

    }
}

export default new UserController();
