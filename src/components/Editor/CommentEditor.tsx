import React, { useCallback, useEffect, useRef, useState } from 'react';
import ContentEditable from 'react-contenteditable';
import CommentEditorStyles from './CommentEditor.styles';
import { CommentEditorProps } from './CommentEditor.types';
import { editorClickOutside } from '../utils';

export default function CommentEditor({
  article: __article__ = '',
  disabled,
  onSubmit,
}: CommentEditorProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [article, setArticle] = useState(__article__);

  const submitWrap = useCallback(
    (comment: string) => {
      onSubmit(comment)
        .then(() => setArticle(''))
        .catch(() => {});
    },
    [onSubmit]
  );

  return (
    <CommentEditorStyles.Layout>
      <CommentEditorStyles.CommentTextArea
        onClick={(e) => editorClickOutside(e, ref.current as HTMLDivElement)}
      >
        <ContentEditable
          innerRef={ref}
          html={article}
          disabled={disabled}
          onChange={(e) => setArticle(e.target.value)}
        />
      </CommentEditorStyles.CommentTextArea>
      <CommentEditorStyles.SubmitButton
        disabled={disabled}
        onClick={() => submitWrap(article)}
      >
        쓰기
      </CommentEditorStyles.SubmitButton>
    </CommentEditorStyles.Layout>
  );
}
