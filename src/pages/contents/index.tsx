import React, { useCallback } from 'react';
import ContentsList from '@/components/List/ContentsList';
import { dehydrate } from '@tanstack/react-query';
import { gsspCallbackWithRQ, gsspWithRq } from '@/utils/server-utils';
import { useContents, UNIQUE_KEY } from '@/hooks/useContents';
import { BoardPage } from '@/components/PageLayout/BoardPage';
import { getContents } from '@/api/handler/contents';
import { useRouter } from 'next/router';

const callback: gsspCallbackWithRQ = async (client, _) => {
  await client.prefetchQuery({ queryFn: getContents, queryKey: UNIQUE_KEY });

  return {
    props: {
      dehydratedState: dehydrate(client),
    },
  };
};

export const getServerSideProps = gsspWithRq(callback);

export default function Contents() {
  const { data: contents } = useContents();
  const router = useRouter();
  const newArticleButtonOnClick = useCallback(() => router.push('/editor'), []);
  return (
    <BoardPage>
      <ContentsList
        contents={contents}
        newArticleButtonOnClick={newArticleButtonOnClick}
      />
    </BoardPage>
  );
}
