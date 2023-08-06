import styled from 'styled-components';

const ContentPageStyle = (() => {
    const Layout = styled.div`
        ${({ theme }) => theme.mixin.flexbox({ direction: 'column', align: "center" })};
        width: 100%;
        min-height: 100%;
        background-color: ${({ theme }) => theme.backgroundcolor.layer_1};
        padding: 40px;
        padding-top: 60px;
    `;
    const Title = styled.h1`
        color : ${({ theme }) => theme.textcolor.emphasis};
        font-size: ${({ theme }) => theme.fontsizes.h1};
        margin-bottom: 20px;
    `

    const ContentArea = styled.div`
        ${({ theme }) => theme.mixin.flexbox({ direction: 'column' })};
        width : 100%;
        max-width: 1000px;

    `

    return {
        Layout,
        ContentArea,
        Title
    }
})()

export default ContentPageStyle