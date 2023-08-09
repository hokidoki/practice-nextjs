import ErrorPage from '@/components/PageLayout/ErrorPage';
import { GetStaticProps } from 'next';

export const getStaticProps: GetStaticProps = () => {
  return {
    props: {
      code: '404',
      message: '페이지를 찾을 수 없습니다.',
    },
  };
};

export default ErrorPage;
