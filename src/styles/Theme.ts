import * as mixin from "./mixins";

const textcolor = {
    plaintext: "#9aa0a6",
    emphasis: "white",
}

const backgroundcolor = {
    layer_1: "rgb(17,17,20)",
    layer_2: "rgb(33,33,36)",
    transparent: "transparent"
}

const bordercolor = {
    layer_1: "rgb(46,48,51)",
    layer_2: "rgb(82,84,59)",
    transparent: "transparent"
}

const fontsizes = {
    h1: "2.5rem",
    h2: "2.125rem",
    plaintext: "1rem",
    bold: "1.25rem",
    label: "1rem",
    value: "1.25rem"
}

const theme = {
    fontsizes,
    textcolor,
    backgroundcolor,
    bordercolor,
    mixin
}

export type themeType = typeof theme;
export default theme







