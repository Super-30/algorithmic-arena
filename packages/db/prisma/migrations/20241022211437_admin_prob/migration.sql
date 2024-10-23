/*
  Warnings:

  - You are about to drop the column `structureMarkdown` on the `Problem` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `TestCase` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `TestCase` table. All the data in the column will be lost.
  - The `input` column on the `TestCase` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `output` column on the `TestCase` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `BoilerplateCode` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `fullcode` to the `DefaultCode` table without a default value. This is not possible if the table is not empty.
  - Made the column `problemMarkdown` on table `Problem` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "BoilerplateCode" DROP CONSTRAINT "BoilerplateCode_problemId_fkey";

-- AlterTable
ALTER TABLE "DefaultCode" ADD COLUMN     "fullcode" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Problem" DROP COLUMN "structureMarkdown",
ALTER COLUMN "problemMarkdown" SET NOT NULL;

-- AlterTable
ALTER TABLE "TestCase" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
DROP COLUMN "input",
ADD COLUMN     "input" TEXT[],
DROP COLUMN "output",
ADD COLUMN     "output" TEXT[];

-- DropTable
DROP TABLE "BoilerplateCode";

-- DropEnum
DROP TYPE "BoilerplateType";
