import React, { useCallback, useState } from 'react';
import { find, isUndefined } from '@fxts/core';
import { CommentListProps } from './CommentList.types';
import CommentsListStyles from './CommentList.styles';
import CommentListItem from '../ListItem/CommentListItem';
import CommentListItemStyles from '../ListItem/CommentListItem.styles';
import CommentEditor from '../Editor/CommentEditor';
import { DashArrayCircleSpinnerWithLayout } from '../Spinner/DashArrayCircleSpinner';

export default function CommentList({
  comments,
  createComment,
  putComment,
  deleteComment,
}: CommentListProps) {
  const [editCommentId, setEditCommentId] = useState<string>();
  const [creating, setCreating] = useState(false);
  const [updatingCommentIds, setUpdatingCommentIds] = useState<string[]>([]);
  const preCreateing = useCallback(
    (comment: string) => {
      setCreating(true);
      return createComment(comment).finally(() => setCreating(false));
    },
    [createComment, setCreating]
  );

  const preUpdating = useCallback(
    (comment: { id: string; article: string }) => {
      setUpdatingCommentIds((prev) => [...prev, comment.id]);
      return putComment(comment).finally(() => {
        setUpdatingCommentIds((prev) => prev.filter((v) => v !== comment.id));
        setEditCommentId((prev) => (prev === comment.id ? '' : prev));
      });
    },
    [setUpdatingCommentIds, putComment]
  );

  const preDeleting = useCallback(
    (id: string) => {
      if (!confirm('댓글을 삭제하시겠습니까?')) return Promise.resolve('');

      setUpdatingCommentIds((prev) => [...prev, id]);
      return deleteComment(id).finally(() =>
        setUpdatingCommentIds((prev) => prev.filter((v) => v !== id))
      );
    },
    [deleteComment, setUpdatingCommentIds]
  );

  return (
    <CommentsListStyles.Layout>
      {comments.map((v) => (
        <CommentListItem
          {...v}
          key={v.id}
          editing={v.id === editCommentId}
          isLoading={
            !isUndefined(find((id) => id === v.id, updatingCommentIds))
          }
          putComment={(comment) => preUpdating({ article: comment, id: v.id })}
          deleteComment={preDeleting}
          setEdit={setEditCommentId}
        />
      ))}
      <CommentListItemStyles.Layout>
        {creating && <DashArrayCircleSpinnerWithLayout />}
        <CommentEditor onSubmit={preCreateing} disabled={creating} />
      </CommentListItemStyles.Layout>
    </CommentsListStyles.Layout>
  );
}
