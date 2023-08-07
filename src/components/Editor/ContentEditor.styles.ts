import styled from 'styled-components';
import ContentPageStyle from '../PageLayout/ContentPage.styles';

const ContentEditorStyle = (() => {
    const Layout = ContentPageStyle.Layout;
    const TitleInput = styled.input`
        width: 100%;
        color : ${({ theme }) => theme.textcolor.emphasis};
        font-size: ${({ theme }) => theme.fontsizes.h1};
        margin-bottom: 20px;
        height: ${({ theme }) => theme.fontsizes.h1};
        background-color: transparent;
        outline: none;
        border: none;
    `
    const ArticleTextArea = styled.div`
        width: 100%;
        min-height: 700px;
        border: 2px solid ${({ theme }) => theme.bordercolor.layer_1};
        border-radius: 10px;
        background-color: transparent;
        outline: none;
        resize: none;
        padding : 10px;
        font-size:${({ theme }) => theme.fontsizes.plaintext};
        color: ${({ theme }) => theme.textcolor.plaintext};
        cursor: text;
        div[contenteditable=true]{
            outline: none;
        }
    `

    const SubmitButton = styled.button`
        width : 100%;
        height: 50px;
        border: 2px solid ${({ theme }) => theme.bordercolor.layer_1};
        border-radius: 10px;
        margin-top: 15px;
        background-color: transparent;
        font-size:${({ theme }) => theme.fontsizes.bold};
        color: ${({ theme }) => theme.textcolor.emphasis};
        transition: all 0.5s;
        &:disabled{
            color: ${({ theme }) => theme.textcolor.summary};
            cursor: not-allowed;
        }
    `

    return {
        Layout,
        TitleInput,
        ArticleTextArea,
        SubmitButton
    }
})()

export default ContentEditorStyle