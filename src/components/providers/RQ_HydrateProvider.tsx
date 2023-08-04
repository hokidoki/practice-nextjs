import React, { ReactNode, useState } from 'react';
import {
  DehydratedState,
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

interface Props {
  children: ReactNode;
  /**
   * 프리패칭된 리액트쿼리 상태입니다.
   * @default undefined
   */
  dehydratedState?: DehydratedState;
}
/**
 * React_Query의 기본 설정과 함께 React Query를 초기화하는 프로바이더 컴포넌트입니다.
 * @param {Props}
 * @returns {JSX.Element}
 */
export default function RQ_HydrateProvider({
  children,
  dehydratedState,
}: Props) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={dehydratedState}>{children}</Hydrate>
      </QueryClientProvider>
    </>
  );
}
