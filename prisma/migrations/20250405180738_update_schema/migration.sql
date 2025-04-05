/*
  Warnings:

  - You are about to drop the column `agencia` on the `Hist` table. All the data in the column will be lost.
  - You are about to drop the column `numero_conta` on the `Hist` table. All the data in the column will be lost.
  - You are about to drop the column `tranfer_ok` on the `Hist` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `Hist` table. All the data in the column will be lost.
  - Added the required column `recipient_account` to the `Hist` table without a default value. This is not possible if the table is not empty.
  - Added the required column `recipient_email` to the `Hist` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sender_account` to the `Hist` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PENDING', 'COMPLETED', 'REVERTED', 'ERROR');

-- DropForeignKey
ALTER TABLE "Hist" DROP CONSTRAINT "Hist_user_id_fkey";

-- AlterTable
ALTER TABLE "Hist" DROP COLUMN "agencia",
DROP COLUMN "numero_conta",
DROP COLUMN "tranfer_ok",
DROP COLUMN "user_id",
ADD COLUMN     "recipient_account" INTEGER NOT NULL,
ADD COLUMN     "recipient_email" TEXT NOT NULL,
ADD COLUMN     "sender_account" INTEGER NOT NULL,
ADD COLUMN     "status_transfer" "Status" NOT NULL DEFAULT 'PENDING',
ALTER COLUMN "valor" SET DATA TYPE DOUBLE PRECISION;

-- AddForeignKey
ALTER TABLE "Hist" ADD CONSTRAINT "Hist_sender_id_fkey" FOREIGN KEY ("sender_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
