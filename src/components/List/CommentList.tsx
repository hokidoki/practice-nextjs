import React from 'react';
import { CommentListProps } from './CommentList.types';
import CommentsListStyles from './CommentList.styles';
import CommentListItem from '../ListItem/CommentListItem';

export default function CommentList({ comments }: CommentListProps) {
  return (
    <CommentsListStyles.Layout>
      {comments.map((v) => (
        <CommentListItem {...v} key={v.id} />
      ))}
    </CommentsListStyles.Layout>
  );
}
