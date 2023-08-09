import React from 'react';
import CommentListItemStyles from './CommentListItem.styles';
import { CommentsListItemProps } from './CommentListItem.types';
import CommentEditor from '../Editor/CommentEditor';
import { DashArrayCircleSpinnerWithLayout } from '../Spinner/DashArrayCircleSpinner';

export default function CommentListItem({
  createdAt,
  article,
  editing,
  id,
  setEdit,
  deleteComment,
  putComment,
  isLoading,
}: CommentsListItemProps) {
  if (editing)
    return (
      <CommentEditListItem
        isLoading={isLoading}
        putComment={putComment}
        deleteComment={deleteComment}
        id={id}
        article={article}
        createdAt={createdAt}
        setEdit={setEdit}
      />
    );

  return (
    <CommentViewListItem
      deleteComment={deleteComment}
      id={id}
      article={article}
      createdAt={createdAt}
      setEdit={setEdit}
    />
  );
}

interface CommentViewListItemProps
  extends Pick<
    CommentsListItemProps,
    'article' | 'createdAt' | 'setEdit' | 'deleteComment' | 'id' | 'isLoading'
  > {}

function CommentViewListItem({
  createdAt,
  setEdit,
  deleteComment,
  article,
  id,
  isLoading,
}: CommentViewListItemProps) {
  return (
    <CommentListItemStyles.Layout>
      {isLoading && <DashArrayCircleSpinnerWithLayout />}
      <CommentListItemStyles.ViewerHeader>
        <CommentListItemStyles.CreatedAt>
          {createdAt}
        </CommentListItemStyles.CreatedAt>
        <CommentListItemStyles.Controlls>
          <CommentListItemStyles.ControlButton
            color="plain"
            disabled={isLoading}
            onClick={() => setEdit(id)}
          >
            수정
          </CommentListItemStyles.ControlButton>
          <CommentListItemStyles.ControlButton
            color="red"
            disabled={isLoading}
            onClick={() => deleteComment(id)}
          >
            삭제
          </CommentListItemStyles.ControlButton>
        </CommentListItemStyles.Controlls>
      </CommentListItemStyles.ViewerHeader>
      <CommentListItemStyles.Article>{article}</CommentListItemStyles.Article>
    </CommentListItemStyles.Layout>
  );
}

interface CommentEditListItemProps
  extends Pick<
    CommentsListItemProps,
    | 'article'
    | 'createdAt'
    | 'setEdit'
    | 'deleteComment'
    | 'id'
    | 'putComment'
    | 'isLoading'
  > {}

function CommentEditListItem({
  article,
  createdAt,
  isLoading,
  id,
  setEdit,
  deleteComment,
  putComment,
}: CommentEditListItemProps) {
  return (
    <CommentListItemStyles.Layout>
      {isLoading && <DashArrayCircleSpinnerWithLayout />}
      <CommentListItemStyles.ViewerHeader>
        <CommentListItemStyles.CreatedAt>
          {createdAt}
        </CommentListItemStyles.CreatedAt>
        <CommentListItemStyles.Controlls>
          <CommentListItemStyles.ControlButton
            color="plain"
            disabled={isLoading}
            onClick={() => setEdit('')}
          >
            취소
          </CommentListItemStyles.ControlButton>
          <CommentListItemStyles.ControlButton
            color="red"
            disabled={isLoading}
            onClick={() => deleteComment(id)}
          >
            삭제
          </CommentListItemStyles.ControlButton>
        </CommentListItemStyles.Controlls>
      </CommentListItemStyles.ViewerHeader>
      <CommentEditor
        disabled={isLoading}
        article={article}
        onSubmit={(article) => putComment(article)}
      />
    </CommentListItemStyles.Layout>
  );
}
