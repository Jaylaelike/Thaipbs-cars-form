/*
  Warnings:

  - Added the required column `Department` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Division` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `EngName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Mobile_Phone` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Phone` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Position` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Section` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ThaiName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image_url` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "Department" TEXT NOT NULL,
ADD COLUMN     "Division" TEXT NOT NULL,
ADD COLUMN     "EngName" TEXT NOT NULL,
ADD COLUMN     "Mobile_Phone" TEXT NOT NULL,
ADD COLUMN     "Phone" TEXT NOT NULL,
ADD COLUMN     "Position" TEXT NOT NULL,
ADD COLUMN     "Section" TEXT NOT NULL,
ADD COLUMN     "ThaiName" TEXT NOT NULL,
ADD COLUMN     "image_url" TEXT NOT NULL;
