import { PrismaClient } from "@prisma/client";
import { IUserRepository } from "./interfaces/IUserRepository";
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



}


export default new UserRepository()