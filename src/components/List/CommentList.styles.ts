import { styled } from 'styled-components';

const CommentsListStyles = (() => {
  const Layout = styled.div`
    ${({ theme }) =>
      theme.mixin.flexbox({ direction: 'column', align: 'center' })};
    width: 100%;
    gap: 20px;
    margin: 20px 0px;
  `;
  return {
    Layout,
  };
})();

export default CommentsListStyles;
