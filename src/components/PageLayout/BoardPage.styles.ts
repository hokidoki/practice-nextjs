import styled from 'styled-components';

const BoardPageStyles = (() => {
    const Layout = styled.div`
    ${({ theme }) => theme.mixin.flexbox({ direction: 'column', align: 'center' })};
    width: 100%;
    min-height: 100%;
    background-color: ${({ theme }) => theme.backgroundcolor.layer_1};
    padding: 40px;
`;

    const Title = styled.h1`
    font-size: ${({ theme }) => theme.fontsizes.h1};
    color: ${({ theme }) => theme.textcolor.emphasis};
    margin-bottom: 60px;
`;

    return {
        Layout,
        Title
    }
})()

export default BoardPageStyles