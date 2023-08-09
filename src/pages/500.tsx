import ErrorPage from '@/components/PageLayout/ErrorPage';
import { GetStaticProps } from 'next';

export const getStaticProps: GetStaticProps = () => {
  return {
    props: {
      code: '500',
      message: '서비스에 불편을 드려 죄송합니다.',
    },
  };
};

export default ErrorPage;
