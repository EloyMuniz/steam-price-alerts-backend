import ISteamRepository from "./interfaces/ISteamRepository";
import { PrismaClient } from "@prisma/client";
import { steamNameID } from "./interfaces/ISteamRepository";
//Instanciar o cliente Prisma
const prisma = new PrismaClient()


class SteamRepository implements ISteamRepository {
    public async steamSaveGames(arrayGames: steamNameID[]): Promise<boolean> {

        try {
            await prisma.steam_games.createMany({
                data: arrayGames
            })


            return true
        } catch (error) {
            console.error("Erro no repositório:", error);
            throw error

        }




    }
}

export default new SteamRepository()