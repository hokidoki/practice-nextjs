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

