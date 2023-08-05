import React from 'react';
import ContentsList from '@/components/List/ContentsList';
import { dehydrate } from '@tanstack/react-query';
import { gsspCallbackWithRQ, gsspWithRq } from '@/utils/server-utils';
import { useContents, UNIQUE_KEY } from '@/hooks/useContents';
import { BoardPage } from '@/components/PageLayout/BoardPage';
import { getContents } from '@/api/handler/contents';

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

  return (
    <BoardPage>
      <ContentsList contents={contents} />
    </BoardPage>
  );
}
