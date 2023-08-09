import ContentEditor from '@/components/Editor/ContentEditor';
import EditorPage from '@/components/PageLayout/EditorPage';
import { useCreateContent } from '@/hooks/useContent';
import React from 'react';
import { NextSeo } from 'next-seo';
export default function Editor() {
  const { mutateAsync } = useCreateContent({});

  return (
    <>
      <NextSeo title={'Editor'} description={'새 게시물'} />
      <EditorPage>
        <ContentEditor onSubmit={mutateAsync} />
      </EditorPage>
    </>
  );
}
