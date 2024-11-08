/*
  Warnings:

  - Added the required column `fullcode` to the `DefaultCode` table without a default value. This is not possible if the table is not empty.
  - Added the required column `problemMarkdown` to the `Problem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DefaultCode" ADD COLUMN     "fullcode" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Problem" ADD COLUMN     "problemMarkdown" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "TestCase" (
    "id" TEXT NOT NULL,
    "input" TEXT[],
    "output" TEXT[],
    "problemId" TEXT NOT NULL,

    CONSTRAINT "TestCase_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TestCase" ADD CONSTRAINT "TestCase_problemId_fkey" FOREIGN KEY ("problemId") REFERENCES "Problem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
