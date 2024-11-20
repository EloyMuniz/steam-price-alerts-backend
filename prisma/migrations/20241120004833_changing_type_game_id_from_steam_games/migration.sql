/*
  Warnings:

  - Added the required column `game_name` to the `steam_games` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "steam_games" DROP COLUMN "game_name",
ADD COLUMN     "game_name" INTEGER NOT NULL;
