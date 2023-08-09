import styled from 'styled-components';

const EditorPageStyle = (() => {
  const Layout = styled.div`
    ${({ theme }) =>
      theme.mixin.flexbox({ direction: 'column', align: 'center' })};
    width: 100%;
    min-height: 100%;
    background-color: ${({ theme }) => theme.backgroundcolor.layer_1};
    padding: 40px;
    padding-top: 60px;
  `;

  const EditorArea = styled.div`
    ${({ theme }) => theme.mixin.flexbox({ direction: 'column' })};
    width: 100%;
    max-width: 1000px;
  `;

  return {
    Layout,
    EditorArea,
  };
})();

export default EditorPageStyle;
