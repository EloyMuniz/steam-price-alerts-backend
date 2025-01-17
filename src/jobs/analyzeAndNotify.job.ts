import cron from "node-cron"
import SteamService from "../services/SteamService";
class analyzeAndNotify {
    public sendEmail() {
        // Agendar a função para ser executada todo dia as 17:00
        cron.schedule("00 17 * * *", async () => {
            try {
                await SteamService.steamGamesSend()
            } catch (error) {
                console.error("Erro ao enviar mensagem:", error);
            }
        },
            {
                timezone: "America/Sao_Paulo",
            }
        );
    }
}

export default new analyzeAndNotify()

