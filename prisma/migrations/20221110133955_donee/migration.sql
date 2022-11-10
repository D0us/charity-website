/*
  Warnings:

  - You are about to drop the column `email` on the `Donee` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Donee" (
    "id" BIGINT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Donee" ("createdAt", "id", "name", "updatedAt") SELECT "createdAt", "id", "name", "updatedAt" FROM "Donee";
DROP TABLE "Donee";
ALTER TABLE "new_Donee" RENAME TO "Donee";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
