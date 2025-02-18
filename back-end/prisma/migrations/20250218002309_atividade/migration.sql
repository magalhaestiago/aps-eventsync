/*
  Warnings:

  - You are about to drop the column `isValid` on the `atividade_complementar` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "atividade_complementar" DROP COLUMN "isValid",
ADD COLUMN     "certificateId" TEXT,
ADD COLUMN     "isReviewed" BOOLEAN NOT NULL DEFAULT false;

-- AddForeignKey
ALTER TABLE "atividade_complementar" ADD CONSTRAINT "atividade_complementar_certificateId_fkey" FOREIGN KEY ("certificateId") REFERENCES "Certificate"("id") ON DELETE SET NULL ON UPDATE CASCADE;
