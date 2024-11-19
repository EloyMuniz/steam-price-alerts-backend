-- CreateTable
CREATE TABLE "steam_games" (
    "steam_games_uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "game_name" VARCHAR(255),
    "game_id" VARCHAR(50),
    "game_price" VARCHAR(100),
    "steam_games_created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "steam_games_updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "steam_games_pkey" PRIMARY KEY ("steam_games_uuid")
);

-- CreateTable
CREATE TABLE "game_settings" (
    "game_settings_uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "use_uuid" UUID,
    "game_set_value" DOUBLE PRECISION,
    "steam_games_uuid" UUID,
    "game_settings_created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "game_settings_updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "game_settings_pkey" PRIMARY KEY ("game_settings_uuid")
);

-- AddForeignKey
ALTER TABLE "game_settings" ADD CONSTRAINT "game_settings_use_uuid_fkey" FOREIGN KEY ("use_uuid") REFERENCES "users"("use_uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "game_settings" ADD CONSTRAINT "game_settings_steam_games_uuid_fkey" FOREIGN KEY ("steam_games_uuid") REFERENCES "steam_games"("steam_games_uuid") ON DELETE SET NULL ON UPDATE CASCADE;
