-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Device" (
    "serial" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "license" TEXT NOT NULL,
    "installed" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "model" TEXT NOT NULL,

    CONSTRAINT "Device_pkey" PRIMARY KEY ("serial")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
