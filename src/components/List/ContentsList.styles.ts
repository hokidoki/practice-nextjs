import { styled } from 'styled-components';

const ContentsListStyles = (() => {
  const Layout = styled.div`
    ${({ theme }) =>
      theme.mixin.flexbox({ direction: 'column', align: 'center' })};
    width: 100%;
    background-color: ${({ theme }) => theme.backgroundcolor.layer_1};
    padding: 40px;
    gap: 20px;
    max-width: 1000px;
  `;

  const AddContentButton = styled.button`
    ${({ theme }) => theme.mixin.flexbox({ direction: 'column' })};
    border: 1px solid ${({ theme }) => theme.bordercolor.layer_1};
    position: relative;
    border-radius: 15px;
    transition: background-color 0.3s;
    width: 100%;
    height: 100px;
    padding: 10px;
    background-color: transparent;
    &::before,
    &::after {
      content: '';
      border-radius: 2px;
      width: 5px;
      height: 40px;
      position: absolute;
      top: 50%;
      left: 50%;
      background-color: ${({ theme }) => theme.bordercolor.layer_1};
      transform: translate(-50%, -50%);
    }

    &::before {
      width: 40px;
      height: 5px;
    }

    &:hover {
      background-color: ${({ theme }) => theme.backgroundcolor.layer_2};
      cursor: pointer;
    }
  `;
  return {
    Layout,
    AddContentButton,
  };
})();

export default ContentsListStyles;
