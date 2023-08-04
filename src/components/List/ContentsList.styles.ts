import { styled } from "styled-components";

const ContentsListStyles = (() => {
    const Layout = styled.div`
        ${({ theme }) => theme.mixin.flexbox({ direction: 'column', align: 'center' })};
        ${({ theme }) => theme.mixin.fullfill()};
        background-color: ${({ theme }) => theme.backgroundcolor.layer_1};
        padding: 40px;
        gap : 20px;
        max-width: 1000px;
    `;
    return {
        Layout,
    }
})()

export default ContentsListStyles