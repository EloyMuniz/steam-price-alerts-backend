import { IUser } from "../repositories/interfaces/IUserRepository";
import UserRepository from "../repositories/UserRepository";
import { isValidEmail } from "../utils/regex";
import bcrypt from "bcrypt";
import { sendEmail } from "../utils/email";

// Classe de erro personalizada
class ServiceError extends Error {
    public statusCode: number;
    constructor(message: string, statusCode: number = 400) {
        super(message);
        this.statusCode = statusCode;
    }
}

class UserService {
    public async userRegister(use_email: string, use_name: string, use_password: string, use_confirm_password: string) {
        try {
            // Verificar se o email é inválido
            if (!isValidEmail(use_email)) {
                throw new ServiceError("Email inválido!", 401);
            }

            // Verificar se o email já existe no banco de dados
            const emailExists = await UserRepository.findbyEMail(use_email);
            if (emailExists) {
                throw new ServiceError("O email já existe!", 409);
            }

            // Verificar se a senha atende aos critérios
            if (use_password.length < 4) {
                throw new ServiceError("A senha precisa ter 4 ou mais caracteres!", 400);
            }

            if (use_password !== use_confirm_password) {
                throw new ServiceError("A senha e a confirmação precisam ser iguais!", 400);
            }

            // Criptografar a senha do usuário
            const saltRounds = 10;
            const passwordHash: string = bcrypt.hashSync(use_password, saltRounds);

            // Criar o usuário
            const result = await UserRepository.createUser(use_email, passwordHash, use_name,);

            if (result) {
                // Enviar email de confirmação
                const emailBody = `Seu cadastro foi efetuado com sucesso, ${use_name}!`;
                const subject = "Registro do usuário";
                sendEmail(use_email, emailBody, subject);

                return { message: "Usuário registrado com sucesso!" };
            }

            throw new ServiceError("Erro ao registrar o usuário!", 500);
        } catch (error: any) {
            if (error instanceof ServiceError) {
                throw error;
            }
            throw new ServiceError("Erro interno no servidor!", 500);
        }
    }
}

export default new UserService();
