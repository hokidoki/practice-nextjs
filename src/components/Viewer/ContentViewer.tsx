import React, { useCallback, useState } from 'react';
import ContentViewerStyles from './ContentViewer.styles';
import ContentVeiwerProps from './ContentViewer.types';
import { DashArrayCircleSpinnerWithLayout } from '../Spinner/DashArrayCircleSpinner';

export default function ContentViewer({
  id,
  createdAt,
  article,
  deleteContent,
  editButtonOnClick,
}: ContentVeiwerProps) {
  const [deleting, setDeleting] = useState(false);
  const preDeleteButtonOnClick = useCallback(
    (id: string) => {
      if (confirm('게시물을 삭제 하시겠습니까?')) {
        setDeleting(true);
        // 컨텐츠가 삭제된 이후 컴포넌트는 더 이상 활성화 되어 있지 않음
        deleteContent(id).catch(() => setDeleting(false));
      }
    },
    [deleteContent]
  );

  return (
    <ContentViewerStyles.Layout>
      {deleting && (
        <DashArrayCircleSpinnerWithLayout layoutProps={{ position: 'fixed' }} />
      )}
      <ContentViewerStyles.ViewerHeader>
        <ContentViewerStyles.CreatedAt>
          {createdAt}
        </ContentViewerStyles.CreatedAt>
        <ContentViewerStyles.Controlls>
          <ContentViewerStyles.ControlButton
            disabled={deleting}
            color="plain"
            onClick={() => editButtonOnClick(id)}
          >
            수정
          </ContentViewerStyles.ControlButton>
          <ContentViewerStyles.ControlButton
            disabled={deleting}
            color="red"
            onClick={() => preDeleteButtonOnClick(id)}
          >
            삭제
          </ContentViewerStyles.ControlButton>
        </ContentViewerStyles.Controlls>
      </ContentViewerStyles.ViewerHeader>
      <ContentViewerStyles.Article
        dangerouslySetInnerHTML={{
          __html: article,
        }}
      />
    </ContentViewerStyles.Layout>
  );
}
