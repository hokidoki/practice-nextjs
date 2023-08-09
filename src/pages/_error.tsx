import ErrorPage from '@/components/PageLayout/ErrorPage';
import { KnownError } from '@/types/global';
import { NextPageContext } from 'next';

export default function Err({ code, message }: KnownError) {
  return <ErrorPage code={code} message={message} />;
}
Err.getInitialProps = ({ res, err }: NextPageContext) => {
  const code = res ? res.statusCode : err ? err.statusCode || 404 : 404;
  const message =
    code === 404 ? '페이지를 찾을 수 없습니다.' : '알 수 없는 에러';
  return { code: code.toString(), message };
};
