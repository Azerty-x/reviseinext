-- CreateTable
CREATE TABLE "Cours" (
    "id" SERIAL NOT NULL,
    "author" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "likes" INTEGER NOT NULL DEFAULT 0,
    "userLiked" INTEGER[] DEFAULT ARRAY[]::INTEGER[],

    CONSTRAINT "Cours_pkey" PRIMARY KEY ("id")
);
