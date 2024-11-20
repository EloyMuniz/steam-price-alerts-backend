export interface steamNameID {
    game_name: string;
    game_id: number;

}

export default interface ISteamRepository {
    steamSaveGames(arrayGames: steamNameID[]): Promise<boolean>
    steamFindGame(game_name: string): Promise<object | null>
    steamSavePrice(game_price: number, game_discount_price: number, steam_games_uuid: string): Promise<boolean>
}