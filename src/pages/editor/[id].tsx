import React, { useCallback } from 'react';
import ContentEditor from '@/components/Editor/ContentEditor';
import EditorPage from '@/components/PageLayout/EditorPage';
import { usePutContent } from '@/hooks/useContent';
import { isString } from '@fxts/core';
import { GetServerSideProps } from 'next';
import { getContent } from '@/api/handler/contents';
import { Content } from '@/types/api';
import { DashArrayCircleSpinnerWithLayout } from '@/components/Spinner/DashArrayCircleSpinner';
import { NextSeo } from 'next-seo';
const callback: GetServerSideProps = async (ctx) => {
  try {
    const { id } = ctx.query;

    if (!isString(id))
      return {
        notFound: true,
      };
    const staticContent = await getContent(id);

    return {
      props: {
        staticContent,
      },
    };
  } catch (error) {
    return {
      redirect: {
        permanent: false,
        destination: '/500',
      },
      props: {},
    };
  }
};

export const getServerSideProps = callback;

interface Props {
  staticContent: Content;
}

export default function Editor({ staticContent }: Props) {
  const { mutateAsync, isLoading } = usePutContent({});
  const { id, createdAt } = staticContent;

  const submitCallback = useCallback(
    ({ article, title }: { article: string; title: string }) =>
      mutateAsync({ article, title, id, createdAt }),
    [id, createdAt, mutateAsync]
  );

  return (
    <>
      <NextSeo
        title={'Edit -' + staticContent.title}
        description={staticContent.title + '수정중'}
      />
      <EditorPage>
        {isLoading && (
          <DashArrayCircleSpinnerWithLayout
            layoutProps={{ position: 'fixed' }}
          />
        )}
        <ContentEditor {...staticContent} onSubmit={submitCallback} />
      </EditorPage>
    </>
  );
}
