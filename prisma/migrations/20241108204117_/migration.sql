/*
  Warnings:

  - You are about to drop the column `name` on the `Roles` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Users` table. All the data in the column will be lost.
  - Added the required column `rolName` to the `Roles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Roles" DROP COLUMN "name",
ADD COLUMN     "rolName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Users" DROP COLUMN "name";
