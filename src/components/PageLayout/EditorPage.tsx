import React from 'react';
import EditorPageStyle from './EditorPage.styles';
import type EditorPageProps from './EditorPage.types';

export default function EditorPage({ children }: EditorPageProps) {
  return (
    <EditorPageStyle.Layout>
      <EditorPageStyle.EditorArea>{children}</EditorPageStyle.EditorArea>
    </EditorPageStyle.Layout>
  );
}
