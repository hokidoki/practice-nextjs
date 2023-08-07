
import { DELETE, GET, POST, PUT } from "../base"
import { pathmaker } from "../utils"
import { MinContent, Content, Comment } from "@/types/api";

const BASE_PATH = `contents`
const path = pathmaker(BASE_PATH);

// Contents
export const getContents = () => GET<MinContent[]>(path(""));
export const getContent = (id: string) => GET<Content>(path(id));
export const postContent = (content: { title: string, article: string }) => POST<Content>(path(""), content);
export const putContent = (content: Content) => PUT<Content>(path(content.id), content);
export const deleteContent = (id: string) => DELETE<string>(path(id));

// Comments
export const getComments = (contentId: string) => GET<Comment[]>(path(contentId, "comments"));
export const postComment = (comment: Comment) => POST(path(comment.articleId, "comments"), comment);
export const putComment = (content: Content) => PUT(path(content.id), content);
export const deleteComment = ({ contentId, commentId }: { contentId: string, commentId: string }) => DELETE(path(contentId, commentId));




