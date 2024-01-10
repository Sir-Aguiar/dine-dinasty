-- CreateTable
CREATE TABLE "threads" (
    "threadId" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" INTEGER NOT NULL,

    CONSTRAINT "threads_pkey" PRIMARY KEY ("threadId")
);

-- AddForeignKey
ALTER TABLE "threads" ADD CONSTRAINT "threads_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
