/*
  Warnings:

  - Made the column `datafim` on table `Certificate` required. This step will fail if there are existing NULL values in that column.
  - Made the column `datainicio` on table `Certificate` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Certificate" ALTER COLUMN "datafim" SET NOT NULL,
ALTER COLUMN "datainicio" SET NOT NULL;
