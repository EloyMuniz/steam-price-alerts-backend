import { PrismaClient } from "@prisma/client";
import { IUser, IUserRepository } from "./interfaces/IUserRepository";
//Instanciar o cliente Prisma
const prisma = new PrismaClient()


class UserRepository implements IUserRepository {

    public async findById(use_uuid: string) {
        const userData = await prisma.users.findUnique({
            select: { use_uuid: true, use_name: true, use_email: true },
            where: { use_uuid: use_uuid }
        })

        return userData


    }
    public async findbyEMail(use_email: string) {

        const emailData = await prisma.users.findFirst({
            select: { use_uuid: true, use_name: true, use_email: true, use_password: true },
            where: { use_email: use_email }
        })

        return emailData
    }
    public async createUser(use_email: string, use_password: string, use_name: string) {

        await prisma.users.create({
            data: {
                use_email: use_email,
                use_password: use_password, use_name: use_name
            }
        })

        return true
    }


}


export default new UserRepository()