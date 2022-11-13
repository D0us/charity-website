/*
  Warnings:

  - Added the required column `causeId` to the `Donee` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Cause" ADD COLUMN     "doneeId" TEXT;

-- AlterTable
ALTER TABLE "Donee" ADD COLUMN     "causeId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Cause" ADD CONSTRAINT "Cause_doneeId_fkey" FOREIGN KEY ("doneeId") REFERENCES "Donee"("id") ON DELETE SET NULL ON UPDATE CASCADE;
