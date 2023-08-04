import React, { useCallback } from 'react';
import { dehydrate } from '@tanstack/react-query';
import { MinContent } from '@/types/api';
import { test } from '@/api/contents';
import { gsspCallbackWithRQ, gsspWithRq } from '@/utils/server-utils';
import { useContents, UNIQUE_KEY } from '@/hooks/useContents';
import PageLayout from '@/components/contents/PageLayout';
import Lists from '@/components/contents/Lists';
import { map, pipe, toArray } from '@fxts/core';
import List from '@/components/contents/List';

const callback: gsspCallbackWithRQ = async (client, ctx) => {
  await client.prefetchQuery({ queryFn: test, queryKey: UNIQUE_KEY });
  return {
    props: {
      dehydratedState: dehydrate(client),
    },
  };
};

export const getServerSideProps = gsspWithRq(callback);

export default function Contents() {
  const { data } = useContents();
  const mapping = useCallback(
    (c: MinContent) => <List key={c.id} {...c} />,
    []
  );

  return (
    <PageLayout>
      <Lists>{pipe(data, map(mapping), toArray)}</Lists>
    </PageLayout>
  );
}
