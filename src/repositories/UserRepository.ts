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
            select: { use_uuid: true, use_name: true, use_email: true },
            where: { use_email: use_email }
        })

        return emailData
    }


}


export default new UserRepository()