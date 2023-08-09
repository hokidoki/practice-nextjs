import styled from 'styled-components';

const CommentEditorStyles = (() => {
  const Layout = styled.div`
    ${({ theme }) => theme.mixin.flexbox({ direction: 'row' })};
    width: 100%;
    height: 100%;
    gap: 20px;
    flex-grow: 1;
    padding: 20px;
  `;

  const CommentTextArea = styled.div`
    width: 100%;
    height: 100%;
    border-radius: 10px;
    background-color: transparent;
    outline: none;
    resize: none;
    padding: 10px;
    font-size: ${({ theme }) => theme.fontsizes.plaintext};
    color: ${({ theme }) => theme.textcolor.plaintext};
    background-color: ${({ theme }) => theme.backgroundcolor.layer_2};
    cursor: text;
    div[contenteditable='true'] {
      outline: none;
    }
  `;

  const SubmitButton = styled.button`
    width: 100px;
    height: 100%;
    border: 2px solid ${({ theme }) => theme.bordercolor.layer_1};
    border-radius: 10px;

    background-color: transparent;
    font-size: ${({ theme }) => theme.fontsizes.bold};
    color: ${({ theme }) => theme.textcolor.emphasis};
    transition: all 0.5s;
    &:disabled {
      color: ${({ theme }) => theme.textcolor.summary};
      cursor: not-allowed;
    }
  `;

  return {
    Layout,
    CommentTextArea,
    SubmitButton,
  };
})();

export default CommentEditorStyles;
