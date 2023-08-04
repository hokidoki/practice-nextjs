import "styled-components";
import type { themeType } from "../styles/Theme"

declare module "styled-components" {
    export interface DefaultTheme extends themeType { }
}