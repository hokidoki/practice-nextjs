import styled from 'styled-components';

const ContentViewerStyles = (() => {
    const contentLeftRightPadding = "10px";
    const Layout = styled.div`
        ${({ theme }) => theme.mixin.flexbox({ direction: 'column', align: 'center' })};
        width: 100%;
        min-height: 700px;
        border: 2px solid ${({ theme }) => theme.bordercolor.layer_1};
        border-radius: 10px;
    `;

    const ViewerHeader = styled.div`
        ${({ theme }) => theme.mixin.flexbox({ direction: 'row', align: "center", justify: "space-between" })};

        height: 50px;
        width: 100%;    
        padding: 0px ${contentLeftRightPadding};
        border-bottom: 1px solid ${({ theme }) => theme.bordercolor.layer_1};
    `

    const CreatedAt = styled.span`
        color: ${({ theme }) => theme.textcolor.summary};
        font-size: ${({ theme }) => theme.fontsizes.label};
    `
    const Controlls = styled.div`
        ${({ theme }) => theme.mixin.flexbox({ direction: 'row', align: "center" })};
        gap: 10px;
        
    `

    const ControlButton = styled.button<{ color: "red" | "plain" }>`
        background-color: transparent;
        border: none;
        color : ${({ theme, color }) => color === "plain" ? theme.textcolor.plaintext : theme.textcolor.warn};
    `

    const Article = styled.p`
        padding : 10px;
        color: ${({ theme }) => theme.textcolor.plaintext};
        width: 100%;
        flex-grow:1 ;
    `

    return {
        Layout,
        ViewerHeader,
        CreatedAt,
        Controlls,
        ControlButton,
        Article
    }
})()

export default ContentViewerStyles;