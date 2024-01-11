export interface IMessage {
  messageId: string;
  threadId: string;
  role: string;
  content: string;
  createdAt: number;
}
