/*
  Warnings:

  - Made the column `instituicao` on table `Certificate` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Certificate" ALTER COLUMN "instituicao" SET NOT NULL;
