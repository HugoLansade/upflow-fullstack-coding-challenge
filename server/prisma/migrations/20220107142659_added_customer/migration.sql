-- CreateEnum
CREATE TYPE "Currency" AS ENUM ('EUR', 'GBP', 'USD');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Due', 'Indispute', 'Overdue', 'Paid', 'Unsent', 'Voided', 'WrittenOff');

-- CreateTable
CREATE TABLE "Invoice" (
    "id" SERIAL NOT NULL,
    "number" INTEGER NOT NULL,
    "customer" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT E'Unsent',
    "issue" TIMESTAMP(3) NOT NULL,
    "due" TIMESTAMP(3) NOT NULL,
    "title" TEXT,
    "outstandingAmount" INTEGER NOT NULL,
    "currency" "Currency" NOT NULL DEFAULT E'EUR',

    CONSTRAINT "Invoice_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Invoice_number_key" ON "Invoice"("number");
