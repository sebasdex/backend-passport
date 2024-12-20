/*
  Warnings:

  - You are about to drop the column `roleId` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the `Roles` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `role` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Users" DROP CONSTRAINT "Users_roleId_fkey";

-- AlterTable
ALTER TABLE "Users" DROP COLUMN "roleId",
ADD COLUMN     "role" TEXT NOT NULL;

-- DropTable
DROP TABLE "Roles";
