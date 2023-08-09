import 'jest-styled-components';
import { ThemeProvider } from 'styled-components';
import { render } from '@testing-library/react';
import theme from '../src/styles/Theme';
import { ReactNode } from 'react';

const Wrapper = ({ children }: { children: ReactNode }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

const renderWithStyledComponent = (
  ui: JSX.Element,
  options?: Parameters<typeof render>[1]
) => render(ui, { wrapper: Wrapper, ...options });

export * from '@testing-library/react';

export { renderWithStyledComponent as render };
