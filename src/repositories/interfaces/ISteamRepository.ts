export interface steamNameID {
    game_name: string;
    game_id: number;
}
export default interface ISteamRepository {
    steamSaveGames(arrayGames: steamNameID[]): Promise<boolean>

}