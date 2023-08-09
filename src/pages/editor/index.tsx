import ContentEditor from '@/components/Editor/ContentEditor';
import EditorPage from '@/components/PageLayout/EditorPage';
import { useCreateContent } from '@/hooks/useContent';
import React, { useCallback } from 'react';

export default function Editor() {
  const { mutateAsync } = useCreateContent({});

  return (
    <EditorPage>
      <ContentEditor onSubmit={mutateAsync} />
    </EditorPage>
  );
}
