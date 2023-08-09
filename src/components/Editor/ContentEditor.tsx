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
  const [isLoading, setIsLoading] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const disabled = useMemo(() => {
    const minimumLength = 3;
    const lengthCondition =
      title.length < minimumLength || article.length < minimumLength;
    const sameCondition = title === __title__ && __article__ === article;
    return sameCondition || lengthCondition;
  }, [title, article, __title__, __article__]);

  const preSubmitHandler = useCallback(
    (title: string, article: string) => {
      setIsLoading(true);
      onSubmit({ title, article }).catch(() => setIsLoading(false));
    },
    [onSubmit]
  );

  return (
    <ContentEditorStyle.Layout>
      <ContentEditorStyle.TitleInput
        placeholder={'제목을 입력하세요'}
        value={title}
        disabled={isLoading}
        onChange={(e) => seTtitle(e.target.value)}
      />
      <ContentEditorStyle.ArticleTextArea onClick={() => ref.current?.focus()}>
        <ContentEditable
          innerRef={ref}
          html={article}
          disabled={isLoading}
          onChange={(e) => setArticle(e.target.value)}
        />
      </ContentEditorStyle.ArticleTextArea>
      <ContentEditorStyle.SubmitButton
        disabled={disabled || isLoading}
        onClick={() => preSubmitHandler(title, article)}
      >
        저장
      </ContentEditorStyle.SubmitButton>
    </ContentEditorStyle.Layout>
  );
}
