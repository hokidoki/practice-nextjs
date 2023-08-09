import styled from 'styled-components';

const ErrorPageStyles = (() => {
  const Layout = styled.div`
    ${({ theme }) =>
      theme.mixin.flexbox({
        direction: 'column',
        align: 'center',
        justify: 'center',
      })};
    width: 100%;
    min-height: 100%;
    background-color: ${({ theme }) => theme.backgroundcolor.layer_1};
    padding: 40px;
  `;

  const Title = styled.h1`
    font-size: ${({ theme }) => theme.fontsizes.h1};
    color: ${({ theme }) => theme.textcolor.warn};
    margin-bottom: 60px;
  `;

  const Message = styled.p`
    font-size: ${({ theme }) => theme.fontsizes.plaintext};
    color: ${({ theme }) => theme.textcolor.plaintext};
  `;

  return {
    Layout,
    Title,
    Message,
  };
})();

export default ErrorPageStyles;
