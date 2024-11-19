

export default interface ISteamRepository {
    steamSaveGames(game_name: string, game_id: string): Promise<void>

}