import React, { useState } from 'react';
import CommentListItemStyles from './CommentListItem.styles';
import { CommentsListItemProps } from './CommentListItem.types';

export default function CommentListItem({
  createdAt,
  article,
}: CommentsListItemProps) {
  const [editing, setEditing] = useState(false);

  if (editing) return <></>;

  return (
    <CommentListItemStyles.Layout>
      <CommentListItemStyles.ViewerHeader>
        <CommentListItemStyles.CreatedAt>
          {createdAt}
        </CommentListItemStyles.CreatedAt>
        <CommentListItemStyles.Controlls>
          <CommentListItemStyles.ControlButton color="plain">
            수정
          </CommentListItemStyles.ControlButton>
          <CommentListItemStyles.ControlButton color="red">
            삭제
          </CommentListItemStyles.ControlButton>
        </CommentListItemStyles.Controlls>
      </CommentListItemStyles.ViewerHeader>
      <CommentListItemStyles.Article>{article}</CommentListItemStyles.Article>
    </CommentListItemStyles.Layout>
  );
}
