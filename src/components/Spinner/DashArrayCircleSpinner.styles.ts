import styled, { keyframes } from 'styled-components';

const DashArrayCircleSpinnerStyle = (() => {
  const radiuse = 48;
  const strokeWidth = 2;
  const offset = Math.PI * radiuse * strokeWidth;
  const Animation = keyframes`
      from {
        stroke-dashoffset: ${offset};
        transform: rotate(0deg)
      }
      to {
        stroke-dashoffset: calc(${offset} * -1);
        transform: rotate(720deg)
      }
    `;
  const Circle = styled.circle`
    width: 100%;
    height: 100%;
    fill: transparent;
    stroke: white;
    stroke-width: ${strokeWidth}px;
    transform-origin: center;
    stroke-dasharray: ${offset};
    animation: ${Animation} 2s infinite ease-in-out alternate;
  `;

  const SVG = styled.svg`
    width: 100px;
    height: 100px;
    max-width: 100%;
    max-height: 100%;
    margin: 0 auto;
  `;
  return {
    SVG,
    Circle,
  };
})();

export default DashArrayCircleSpinnerStyle;
