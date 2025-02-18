-- DropForeignKey
ALTER TABLE "atividade_complementar" DROP CONSTRAINT "atividade_complementar_certificateId_fkey";

-- AddForeignKey
ALTER TABLE "atividade_complementar" ADD CONSTRAINT "atividade_complementar_certificateId_fkey" FOREIGN KEY ("certificateId") REFERENCES "Certificate"("id") ON DELETE CASCADE ON UPDATE CASCADE;
