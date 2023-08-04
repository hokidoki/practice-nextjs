import React, { ReactNode } from 'react';
import { ThemeProvider } from 'styled-components';
import theme from '@/styles/Theme';

interface Props {
  children: ReactNode;
}
/**
 * 해당 프로젝트에서 사용되는 StyledComponent의 테마를 설정하는 컴포넌트
 * @param {Props}
 * @returns {JSX.Element}
 */
export default function SC_DefaultThemeProvider({ children }: Props) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
