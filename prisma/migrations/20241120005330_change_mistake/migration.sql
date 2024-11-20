/*
  Warnings:

  - Added the required column `game_id` to the `steam_games` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "steam_games" DROP COLUMN "game_id",
ADD COLUMN     "game_id" INTEGER NOT NULL,
ALTER COLUMN "game_name" DROP NOT NULL,
ALTER COLUMN "game_name" SET DATA TYPE VARCHAR(50);
