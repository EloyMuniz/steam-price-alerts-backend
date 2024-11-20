import ISteamRepository from "./interfaces/ISteamRepository";
import { PrismaClient } from "@prisma/client";
import { steamNameID } from "./interfaces/ISteamRepository";
//Instanciar o cliente Prisma
const prisma = new PrismaClient()
type SteamGame = {
    steam_games_uuid: string | null
    game_price: number | null;
    game_discount_price: number | null;
    game_id: number | null
};

class SteamRepository implements ISteamRepository {
    //Salva os jogos da steam na tabela steam_games
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
    //Busca um jogo pelo seu nome no banco de dados em steam_games
    public async steamFindGame(game_name: string): Promise<SteamGame | null> {
        try {

            const data = await prisma.steam_games.findFirst({
                select: {
                    game_id: true,
                    game_discount_price: true, game_price: true, steam_games_uuid: true
                }, where: { game_name: game_name }
            })

            return data


        } catch (error) {
            console.error("Erro no repositório:", error);
            throw error
        }
    }
    //Salva os valores dos jogos através da chave primária
    public async steamSavePrice(game_price: number, game_discount_price: number, steam_games_uuid: string): Promise<boolean> {
        try {

            await prisma.steam_games.update({
                where: { steam_games_uuid: steam_games_uuid },
                data: { game_price: game_price, game_discount_price: game_discount_price }
            })

            return true

        } catch (error) {
            console.error("Erro no repositório:", error);
            throw error
        }
    }




}

export default new SteamRepository()