import React, { useCallback, useMemo, useRef, useState } from 'react';
import ContentEditable from 'react-contenteditable';
import ContentEditorStyle from './ContentEditor.styles';
import { ContentEditorProps } from './ContentEditor.types';

export default function ContentEditor({
  title: __title__ = '',
  article: __article__ = '',
  onSubmit,
}: ContentEditorProps) {
  const [title, seTtitle] = useState(__title__);
  const [article, setArticle] = useState(__article__);
  const ref = useRef<HTMLDivElement>(null);
  const disabled = useMemo(() => {
    const minimumLength = 3;
    return title.length < minimumLength || article.length < minimumLength;
  }, [title, article]);

  const preSubmitHandler = useCallback(
    (title: string, article: string) => {
      if (title === __title__ && article === __article__)
        return alert('기존과 동일하게 수정 할 수 없습니다.');

      onSubmit({ title, article });
    },
    [__title__, __article__, onSubmit]
  );

  return (
    <ContentEditorStyle.Layout>
      <ContentEditorStyle.TitleInput
        placeholder={'제목을 입력하세요'}
        value={title}
        onChange={(e) => seTtitle(e.target.value)}
      />
      <ContentEditorStyle.ArticleTextArea onClick={() => ref.current?.focus()}>
        <ContentEditable
          innerRef={ref}
          html={article}
          disabled={false}
          onChange={(e) => setArticle(e.target.value)}
        />
      </ContentEditorStyle.ArticleTextArea>
      <ContentEditorStyle.SubmitButton
        disabled={disabled}
        onClick={() => preSubmitHandler(title, article)}
      >
        저장
      </ContentEditorStyle.SubmitButton>
    </ContentEditorStyle.Layout>
  );
}
