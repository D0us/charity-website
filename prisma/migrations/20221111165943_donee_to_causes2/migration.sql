/*
  Warnings:

  - You are about to drop the column `doneeId` on the `Cause` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Cause" DROP CONSTRAINT "Cause_doneeId_fkey";

-- AlterTable
ALTER TABLE "Cause" DROP COLUMN "doneeId";

-- AddForeignKey
ALTER TABLE "Donee" ADD CONSTRAINT "Donee_causeId_fkey" FOREIGN KEY ("causeId") REFERENCES "Cause"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
