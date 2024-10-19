-- CreateTable
CREATE TABLE "Country" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "votes" INTEGER NOT NULL DEFAULT 0,
    "color" TEXT NOT NULL,

    CONSTRAINT "Country_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Country_label_key" ON "Country"("label");
