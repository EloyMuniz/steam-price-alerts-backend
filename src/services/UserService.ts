import { IUser } from "../repositories/interfaces/IUserRepository";
import UserRepository from "../repositories/UserRepository";
import { isValidEmail } from "../utils/regex";
import bcrypt from "bcrypt"
import { sendEmail } from "../utils/email";
class UserService {

    public async userRegister(use_email: string, use_name: string, use_password: string) {
        try {
            //Verificar se o email é inválido
            await UserRepository.findbyEMail(use_email)
            if (isValidEmail(use_email)) {
                throw new Error("Email inválido!")
            }
            //Verificar se o email já existe no Banco de Dados

            if (!isValidEmail(use_email)) {
                throw new Error("O email já existe!")
            }

            //Criptografar a senha do usuário
            const randomPassword = Math.random().toString(36).slice(-4);
            const saltRounds = 10;
            const passwordHash: string = bcrypt.hashSync(randomPassword, saltRounds);
            await UserRepository.createUser(use_email, use_name, passwordHash)
            const emailBody = `Seu cadastro foi efetuado com sucesso, ${use_name}!`
            const subject = "Registro do usuário"

            sendEmail(use_email, emailBody, subject)
        } catch (error: any) {
            throw new Error(`Error sending email: ${error.message}`)
        }




    }
}
export default new UserService()