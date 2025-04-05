/*
  Warnings:

  - Added the required column `sender_id` to the `Hist` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Hist" ADD COLUMN     "sender_id" INTEGER NOT NULL,
ADD COLUMN     "tranfer_ok" BOOLEAN NOT NULL DEFAULT true;
