-- AlterTable
ALTER TABLE "Balance" ADD COLUMN     "agencia" INTEGER NOT NULL DEFAULT 1052,
ADD COLUMN     "numero_conta" SERIAL NOT NULL;
