/*
  Warnings:

  - A unique constraint covering the columns `[zipCode]` on the table `recipients` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "recipients_zipCode_key" ON "recipients"("zipCode");
