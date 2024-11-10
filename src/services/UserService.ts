import { IUser } from "../repositories/interfaces/IUserRepository";
import UserRepository from "../repositories/UserRepository";
import { isValidEmail } from "../utils/regex";
import bcrypt from "bcrypt"
import { sendEmail } from "../utils/email";
class UserService {

    public async userRegister(use_email: string, use_name: string, use_password: string): Promise<boolean | undefined> {
        try {
            //Verificar se o email já existe no Banco de Dados
            await UserRepository.findbyEMail(use_email)
            if (isValidEmail(use_email)) {
                return false
            }
            //Verificar se o email é inválido
            if (!isValidEmail(use_email)) {
                return false
            }
            //Criptografar a senha do usuário
            const randomPassword = Math.random().toString(36).slice(-4);
            const saltRounds = 10;
            const passwordHash: string = bcrypt.hashSync(randomPassword, saltRounds);
            await UserRepository.createUser(use_email, use_name, use_password)
            const emailBody = "Seu cadastro foi efetuado com sucesso!"
            const subject = "Registro do usuário"
            sendEmail(use_email, emailBody, subject)



        } catch (error) {
            console.log(`Erro ocorrido:${error}`)
        }

    }
}
export default new UserService()