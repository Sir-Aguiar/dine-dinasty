-- CreateTable
CREATE TABLE "messages" (
    "messageId" TEXT NOT NULL,
    "threadId" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" INTEGER NOT NULL,

    CONSTRAINT "messages_pkey" PRIMARY KEY ("messageId")
);

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_threadId_fkey" FOREIGN KEY ("threadId") REFERENCES "threads"("threadId") ON DELETE RESTRICT ON UPDATE CASCADE;
