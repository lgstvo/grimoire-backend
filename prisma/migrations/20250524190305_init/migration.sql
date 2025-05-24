-- CreateTable
CREATE TABLE "CanvasPattern" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "matrix" TEXT NOT NULL,
    "centerPointState" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "mainColor" TEXT NOT NULL
);
