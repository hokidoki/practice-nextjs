import type { Content, Comment } from '@/types/api';
import React, { useCallback } from 'react';
import { dehydrate } from '@tanstack/react-query';
import { gsspCallbackWithRQ, gsspWithRq } from '@/utils/server-utils';
import {
  UNIQUE_KEY,
  useContentQuery,
  useDeleteContent,
} from '@/hooks/useContent';
import {
  UNIQUE_KEY as COMMENT_UNIQUE_KEY,
  useCommentQuery,
} from '@/hooks/useComment';
import { getComments, getContent } from '@/api/handler/contents';
import { isString } from '@fxts/core';
import { useRouter } from 'next/router';
import ContentPageLayout from '@/components/PageLayout/ContentPage';
import ContentViewer from '@/components/Viewer/ContentViewer';
import CommentList from '@/components/List/CommentList';

const callback: gsspCallbackWithRQ = async (client, ctx) => {
  try {
    const { id } = ctx.query;

    if (!isString(id))
      return {
        notFound: true,
      };
    const staticContent = await getContent(id);
    const staticComments = await getComments(id);
    await client.prefetchQuery({
      queryFn: () => getComments(id),
      queryKey: COMMENT_UNIQUE_KEY(id),
      initialData: staticComments,
    });
    await client.prefetchQuery({
      queryFn: () => getContent(id),
      queryKey: UNIQUE_KEY(id),
      initialData: staticContent,
    });

    return {
      props: {
        dehydratedState: dehydrate(client),
        staticContent,
        staticComments,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

export const getServerSideProps = gsspWithRq(callback);

interface Props {
  staticContent: Content;
  staticComments: Comment[];
}

export default function ContentPage({ staticContent, staticComments }: Props) {
  const router = useRouter();
  const { mutateAsync, isSuccess } = useDeleteContent();
  const { data: content } = useContentQuery({
    contentId: staticContent.id,
    initialData: staticContent,
    enabled: false,
  });

  const { data: comments } = useCommentQuery({
    contentId: staticContent.id,
    initialData: staticComments,
    enabled: false,
  });

  const deleteButtonOnClick = useCallback(
    (id: string) => {
      if (confirm('삭제 하시겠습니까?')) mutateAsync(id);
    },
    [mutateAsync]
  );
  return (
    <ContentPageLayout title={content.title}>
      <ContentViewer
        {...content}
        deleteButtonOnClick={deleteButtonOnClick}
        editButtonOnClick={(id) => router.push(`/editor/${id}`)}
      />
      <CommentList comments={comments} />
    </ContentPageLayout>
  );
}
