import { DehydratedState, QueryClient } from "@tanstack/react-query";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";

export interface PagePropsWithRQ {
    dehydratedState?: DehydratedState
}
export type gsspCallbackWithRQ<T = any> = (qr_client: QueryClient, ctx: GetServerSidePropsContext) => Promise<GetServerSidePropsResult<PagePropsWithRQ & T>>

/**
 * getServerSideProps 콜백 함수에 React Query를 함께 사용하는 래퍼 함수입니다.
 * @param {gsspCallbackWithRQ} fn - getServerSideProps 콜백 함수
 * @returns {() => Promise<GetServerSidePropsResult<PagePropsWithRQ & T>>} 래핑된 콜백 함수
 */
export const gsspWithRq = (fn: gsspCallbackWithRQ) => (ctx: GetServerSidePropsContext) => fn(new QueryClient(), ctx);
