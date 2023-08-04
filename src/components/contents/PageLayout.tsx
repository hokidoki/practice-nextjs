import React, { ReactNode } from 'react';
import styled from 'styled-components';

interface Props {
  children: ReactNode;
}

export default function PageLayout({ children }: Props) {
  return (
    <Layout>
      <Title>Content Lists</Title>
      {children}
    </Layout>
  );
}
const Layout = styled.div`
  ${({ theme }) =>
    theme.mixin.flexbox({ direction: 'column', align: 'center' })};
  ${({ theme }) => theme.mixin.fullfill()};
  background-color: ${({ theme }) => theme.backgroundcolor.layer_1};
  padding: 40px;
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontsizes.h1};
  color: ${({ theme }) => theme.textcolor.emphasis};
  margin-bottom: 60px;
`;
