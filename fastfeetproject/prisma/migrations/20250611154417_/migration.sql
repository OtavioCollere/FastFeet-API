/*
  Warnings:

  - Added the required column `zipCode` to the `recipients` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "recipients" ADD COLUMN     "zipCode" TEXT NOT NULL;
