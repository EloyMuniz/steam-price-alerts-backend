import ISteamRepository from "./interfaces/ISteamRepository";
import { PrismaClient } from "@prisma/client";

//Instanciar o cliente Prisma
const prisma = new PrismaClient()


class SteamRepository implements ISteamRepository {
    public async steamSaveGames() { 

        










    }
}

export default new SteamRepository()