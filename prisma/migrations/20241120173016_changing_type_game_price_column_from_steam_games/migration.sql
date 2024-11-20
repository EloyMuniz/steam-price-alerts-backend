/*
  Warnings:

  - The `game_price` column on the `steam_games` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "steam_games" DROP COLUMN "game_price",
ADD COLUMN     "game_price" INTEGER;
