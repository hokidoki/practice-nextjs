import styled from 'styled-components';

const SpinnerLayoutStyle = (() => {
  interface ParentCoverLayoutProps {
    /**
     * @default absolute
     */
    position?: 'fixed' | 'absolute';
    /**
     * hex code
     * @default "#bdc1c6"
     */
    bgColor?: string;
    /**
     * @default 0.7
     */
    bgOpacity?: number;
  }
  /**
   * 사용시 커버되길 원하는 부모 컨테이너의 position은 static이 아니여야함
   */
  const ParentCoverLayout = styled.div<ParentCoverLayoutProps>`
    ${({ theme }) =>
      theme.mixin.flexbox({ justify: 'center', align: 'center' })}
    position: ${({ position = 'absolute' }) => position};
    background-color: ${({ theme, bgOpacity = 0.7, bgColor = '#bdc1c6' }) =>
      theme.mixin.hexToRGBA(bgColor, bgOpacity)};
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
  `;
  return {
    ParentCoverLayout,
  };
})();

export default SpinnerLayoutStyle;
