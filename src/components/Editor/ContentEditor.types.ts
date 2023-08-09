export interface ContentEditorProps {
    title?: string,
    article?: string,
    onSubmit: (content: { title: string, article: string }) => Promise<any>

}