-- CreateEnum
CREATE TYPE "Conformity" AS ENUM ('SHALL', 'SHOULD', 'MAY');

-- CreateTable
CREATE TABLE "Model" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Model_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DataElement" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "card" TEXT NOT NULL,
    "description" TEXT,
    "modelId" INTEGER NOT NULL,

    CONSTRAINT "DataElement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Role" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DataOperation" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "DataOperation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MaturityLevel" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "MaturityLevel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RequiredMaturityLevel" (
    "id" SERIAL NOT NULL,
    "systemFunctionId" INTEGER NOT NULL,
    "roleId" INTEGER NOT NULL,
    "maturityLevelId" INTEGER NOT NULL,

    CONSTRAINT "RequiredMaturityLevel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rule" (
    "id" SERIAL NOT NULL,
    "conformity" "Conformity" NOT NULL,
    "systemFunctionId" INTEGER NOT NULL,
    "roleId" INTEGER NOT NULL,
    "dataOperationId" INTEGER NOT NULL,
    "maturityLevelId" INTEGER NOT NULL,

    CONSTRAINT "Rule_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Model_name_key" ON "Model"("name");

-- CreateIndex
CREATE UNIQUE INDEX "DataElement_name_key" ON "DataElement"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Role_name_key" ON "Role"("name");

-- CreateIndex
CREATE UNIQUE INDEX "DataOperation_name_key" ON "DataOperation"("name");

-- CreateIndex
CREATE UNIQUE INDEX "MaturityLevel_name_key" ON "MaturityLevel"("name");

-- AddForeignKey
ALTER TABLE "DataElement" ADD CONSTRAINT "DataElement_modelId_fkey" FOREIGN KEY ("modelId") REFERENCES "Model"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RequiredMaturityLevel" ADD CONSTRAINT "RequiredMaturityLevel_systemFunctionId_fkey" FOREIGN KEY ("systemFunctionId") REFERENCES "SystemFunction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RequiredMaturityLevel" ADD CONSTRAINT "RequiredMaturityLevel_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RequiredMaturityLevel" ADD CONSTRAINT "RequiredMaturityLevel_maturityLevelId_fkey" FOREIGN KEY ("maturityLevelId") REFERENCES "MaturityLevel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rule" ADD CONSTRAINT "Rule_systemFunctionId_fkey" FOREIGN KEY ("systemFunctionId") REFERENCES "SystemFunction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rule" ADD CONSTRAINT "Rule_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rule" ADD CONSTRAINT "Rule_dataOperationId_fkey" FOREIGN KEY ("dataOperationId") REFERENCES "DataOperation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rule" ADD CONSTRAINT "Rule_maturityLevelId_fkey" FOREIGN KEY ("maturityLevelId") REFERENCES "MaturityLevel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
