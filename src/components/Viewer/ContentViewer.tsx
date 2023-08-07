import React from 'react';
import ContentViewerStyles from './ContentViewer.styles';
import ContentVeiwerProps from './ContentViewer.types';

export default function ContentViewer({
  id,
  createdAt,
  article,
  deleteButtonOnClick,
  editButtonOnClick,
}: ContentVeiwerProps) {
  return (
    <ContentViewerStyles.Layout>
      <ContentViewerStyles.ViewerHeader>
        <ContentViewerStyles.CreatedAt>
          {createdAt}
        </ContentViewerStyles.CreatedAt>
        <ContentViewerStyles.Controlls>
          <ContentViewerStyles.ControlButton
            color="plain"
            onClick={() => editButtonOnClick(id)}
          >
            수정
          </ContentViewerStyles.ControlButton>
          <ContentViewerStyles.ControlButton
            color="red"
            onClick={() => deleteButtonOnClick(id)}
          >
            삭제
          </ContentViewerStyles.ControlButton>
        </ContentViewerStyles.Controlls>
      </ContentViewerStyles.ViewerHeader>
      <ContentViewerStyles.Article
        dangerouslySetInnerHTML={{
          __html: article.replace(/(?:\r\n|\r|\n)/g, '<br>'),
        }}
      />
    </ContentViewerStyles.Layout>
  );
}
