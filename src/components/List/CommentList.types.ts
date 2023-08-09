import { Comment } from '@/types/api';

export interface CommentListProps {
  comments: Comment[];
  createComment: (comment: string) => Promise<any>;
  deleteComment: (id: string) => Promise<any>;
  putComment: (comment: { article: string; id: string }) => Promise<any>;
}
