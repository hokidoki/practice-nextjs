import { css } from "styled-components";
import type { Property } from "csstype"
// 
type FlexDefine = { direction?: Property.FlexDirection, justify?: Property.JustifyContent, align?: Property.AlignItems }
export const flexbox = ({ direction = "row", justify = "flex-start", align = "flex-start" }: FlexDefine) => css`
    display: flex;
    flex-direction: ${direction};
    justify-content:  ${justify};
    align-items: ${align} ;
`

export const fullfill = () => css`
    width : 100%;
    height: 100%;
`

export const hexToRGBA = (hex: string, opcity: number) => {
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;

    return `rgba(${r},${g},${b},${opcity})`;
}