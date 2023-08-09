import { DELETE, GET, POST, PUT } from '../base';
import { pathmaker } from '../utils';
import { MinContent, Content, Comment } from '@/types/api';

const BASE_PATH = `contents`;
const path = pathmaker(BASE_PATH);

// Contents
export const getContents = () => GET<MinContent[]>(path(''));
export const getContent = (id: string) => GET<Content>(path(id));
export const postContent = (content: { title: string; article: string }) =>
  POST<Content>(path(''), content);
export const putContent = (content: Content) =>
  PUT<Content>(path(content.id), content);
export const deleteContent = (id: string) => DELETE<string>(path(id));

// Comments
export const getComments = (articleId: string) =>
  GET<Comment[]>(path(articleId, 'comments'));
export const postComment = (comment: { articleId: string; article: string }) =>
  POST<Comment>(path(comment.articleId, 'comments'), comment);
export const putComment = (content: {
  articleId: string;
  article: string;
  id: string;
}) => PUT<Comment>(path(content.articleId, 'comments', content.id), content);
export const deleteComment = ({
  articleId,
  id,
}: {
  articleId: string;
  id: string;
}) => DELETE<string>(path(articleId, 'comments', id));
