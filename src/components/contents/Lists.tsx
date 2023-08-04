import React, { ReactNode } from 'react';
import { styled } from 'styled-components';

interface Props {
  children: ReactNode;
}

export default function Lists({ children }: Props) {
  return <ListsLayout>{children}</ListsLayout>;
}

const ListsLayout = styled.div`
  ${({ theme }) =>
    theme.mixin.flexbox({ direction: 'column', align: 'center' })}
  gap : 20px;
  width: 100%;
  max-width: 500px;
`;
