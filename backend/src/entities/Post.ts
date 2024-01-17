export interface IPost {
  postId: string;
  threadId: string;
  userId: number;
  title: string;
  ownerReview: string | null;
  upVotes: number;
  downVotes: number;
  views: number;

  createdAt: Date;
}
