import type { Comment } from "@/types/api";
import { CommentEditorProps } from "../Editor/CommentEditor.types";

export interface CommentsListItemProps extends Comment {
    editing: boolean
    setEdit: (id: string) => void
    putComment: CommentEditorProps["onSubmit"]
    deleteComment: (id: string) => Promise<any>
    isLoading?: boolean,
}