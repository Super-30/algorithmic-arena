-- CreateEnum
CREATE TYPE "BoilerplateType" AS ENUM ('PARTIAL', 'FULL');

-- AlterTable
ALTER TABLE "Problem" ADD COLUMN     "problemMarkdown" TEXT,
ADD COLUMN     "structureMarkdown" TEXT;

-- CreateTable
CREATE TABLE "TestCase" (
    "id" TEXT NOT NULL,
    "input" JSONB NOT NULL,
    "output" JSONB NOT NULL,
    "problemId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TestCase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BoilerplateCode" (
    "id" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "boilerplateType" "BoilerplateType" NOT NULL,
    "problemId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BoilerplateCode_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BoilerplateCode_problemId_language_boilerplateType_key" ON "BoilerplateCode"("problemId", "language", "boilerplateType");

-- AddForeignKey
ALTER TABLE "TestCase" ADD CONSTRAINT "TestCase_problemId_fkey" FOREIGN KEY ("problemId") REFERENCES "Problem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BoilerplateCode" ADD CONSTRAINT "BoilerplateCode_problemId_fkey" FOREIGN KEY ("problemId") REFERENCES "Problem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
