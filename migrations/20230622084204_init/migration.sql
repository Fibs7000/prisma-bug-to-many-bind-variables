-- CreateTable
CREATE TABLE "A" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "A_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "B" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "B_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_AToB" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_AToB_AB_unique" ON "_AToB"("A", "B");

-- CreateIndex
CREATE INDEX "_AToB_B_index" ON "_AToB"("B");

-- AddForeignKey
ALTER TABLE "_AToB" ADD CONSTRAINT "_AToB_A_fkey" FOREIGN KEY ("A") REFERENCES "A"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AToB" ADD CONSTRAINT "_AToB_B_fkey" FOREIGN KEY ("B") REFERENCES "B"("id") ON DELETE CASCADE ON UPDATE CASCADE;
