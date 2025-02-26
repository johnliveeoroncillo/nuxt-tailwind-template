/*
  Warnings:

  - The primary key for the `Users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `CreateAt` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `Email` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `Id` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `Name` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `Password` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `Surname` on the `Users` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Users_Email_key";

-- AlterTable
ALTER TABLE "Users" DROP CONSTRAINT "Users_pkey",
DROP COLUMN "CreateAt",
DROP COLUMN "Email",
DROP COLUMN "Id",
DROP COLUMN "Name",
DROP COLUMN "Password",
DROP COLUMN "Surname",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deleted_at" TIMESTAMP(3),
ADD COLUMN     "email" TEXT,
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "name" VARCHAR(50),
ADD COLUMN     "password" TEXT,
ADD COLUMN     "updated_at" TIMESTAMP(3),
ADD CONSTRAINT "Users_pkey" PRIMARY KEY ("id");
