export interface CommentEditorProps {
    article?: string
    onSubmit: (comment: string) => Promise<any>
    disabled?: boolean
}