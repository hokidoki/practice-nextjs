import { MinContent } from '@/types/api';
import Link from 'next/link';
import styled from 'styled-components';

interface Props extends MinContent {}

export default function List({ id, title, summary }: Props) {
  return (
    <Layout>
      <Link href={`/contents/${id}`}>
        <Title>{title}</Title>
      </Link>
      <Summary>{summary}</Summary>
    </Layout>
  );
}

const Layout = styled.div`
  ${({ theme }) => theme.mixin.flexbox({ direction: 'column' })}
  border : 1px solid ${({ theme }) => theme.bordercolor.layer_1};
  border-radius: 15px;
  transition: background-color 0.3s;
  width: 100%;
  height: 100px;
  padding: 10px;
  &:hover {
    background-color: ${({ theme }) => theme.backgroundcolor.layer_2};
  }
`;
const Title = styled.span`
  color: ${({ theme }) => theme.textcolor.plaintext};
  font-size: ${({ theme }) => theme.fontsizes.bold};
`;

const Summary = styled.p`
  color: ${({ theme }) => theme.textcolor.summary};
  font-size: ${({ theme }) => theme.fontsizes.bold};
`;
