import React from 'react';
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
  useCreateComment,
  useDeleteComment,
  usePutComment,
} from '@/hooks/useComment';
import { getComments, getContent } from '@/api/handler/contents';
import { isString } from '@fxts/core';
import { useRouter } from 'next/router';
import ContentPageLayout from '@/components/PageLayout/ContentPage';
import ContentViewer from '@/components/Viewer/ContentViewer';
import CommentList from '@/components/List/CommentList';
import RedirectComponent from '@/components/Utils/RedirectComponent';

const callback: gsspCallbackWithRQ = async (client, ctx) => {
  try {
    const { id } = ctx.query;

    if (!isString(id))
      return {
        notFound: true,
      };
    await Promise.all([
      client.prefetchQuery({
        queryFn: () => getComments(id),
        queryKey: COMMENT_UNIQUE_KEY(id),
      }),
      client.prefetchQuery({
        queryFn: () => getContent(id),
        queryKey: UNIQUE_KEY(id),
      }),
    ]);

    return {
      props: {
        dehydratedState: dehydrate(client),
        articleId: id,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};
// getStaticSiteProps로 가자.
export const getServerSideProps = gsspWithRq(callback);

interface Props {
  articleId: string;
}

export default function ContentPage({ articleId }: Props) {
  const router = useRouter();

  // Mutations
  const { mutateAsync: createComment } = useCreateComment({});
  const { mutateAsync: putComment } = usePutComment({});
  const { mutateAsync: deleteComment } = useDeleteComment({});
  const { mutateAsync: deleteContent } = useDeleteContent({});
  const { data: content } = useContentQuery({
    contentId: articleId,
  });

  const { data: comments } = useCommentQuery({
    articleId,
  });
  if (!content) return <RedirectComponent path={'/error/404'} />;

  return (
    <ContentPageLayout title={content.title}>
      <ContentViewer
        {...content}
        deleteContent={deleteContent}
        editButtonOnClick={(id) => router.push(`/editor/${id}`)}
      />
      <CommentList
        comments={comments}
        putComment={({ article, id }) => putComment({ articleId, id, article })}
        deleteComment={(id) => deleteComment({ id, articleId })}
        createComment={(article) => createComment({ article, articleId })}
      />
    </ContentPageLayout>
  );
}
