import cron from "node-cron"

class analyzeAndNotify {
    public sendEmail() {
        // Agende a função para ser executada todo dia as 17:00
        cron.schedule("00 17 * * *", async () => {
            try {
                
            } catch (error) {
                console.error("Erro durante a verificação de alertas:", error);
            }
        },
            {
                timezone: "America/Sao_Paulo",
            }
        );
    }
}

export default new analyzeAndNotify()

// noreplyflowbittech@gmail.com