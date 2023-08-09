import {
  pipe,
  delay,
  slice,
  join,
  map,
  find,
  append,
  toArray,
  filter,
  isUndefined,
  findIndex,
} from '@fxts/core';
import { CreateContentMock, staticComments, staticContents } from './datas';
import { Content, MinContent, Comment } from '@/types/api';
import { v4 as randomUUID } from 'uuid';
import sanitizeHtml from 'sanitize-html';
import axios from 'axios';

const db = (() => {
  const tenMil = 10;
  const summaryLength = 20;
  const convertSummary = (str: string) =>
    pipe(str, slice(0, summaryLength), join(''));
  const convertMinContent = (c: Content): MinContent =>
    pipe(c, ({ id, title, createdAt, article }) => ({
      id,
      title,
      createdAt,
      summary: convertSummary(article),
    }));
  const replace = <T>(target: T, targetIndex: number, arr: T[]) => [
    ...toArray(slice(0, targetIndex, arr)),
    target,
    ...toArray(slice(targetIndex + 1, arr.length, arr)),
  ];
  /**
   * 가상 네트워크 딜레이
   */
  const delaiedFn = <T, P>(fn: (arg1: T) => P) => {
    return async (arg1: T) => {
      await delay(tenMil);
      const result = fn(arg1);
      await serverEqualizeRequest();
      return result;
    };
  };

  let contents = [...staticContents];
  let comments = [...staticComments];

  /**
   * 자연스러운 플로우를 개발환경에서도 보기위해 서버와 데이터 공유.
   */
  const serverEqualize = ({
    contents: con,
    comments: com,
  }: {
    contents: Content[];
    comments: Comment[];
  }) => {
    contents = con;
    comments = com;
  };

  const serverEqualizeRequest = async () => {
    if (typeof window !== 'undefined')
      await axios.post('http://localhost:3000/api/mock', {
        contents,
        comments,
      });
  };

  const getContents = delaiedFn<void, MinContent[]>(() =>
    pipe(contents, map(convertMinContent), toArray)
  );

  const getContent = delaiedFn((id: string) =>
    find((c) => c.id === id, contents)
  );
  const postContent = delaiedFn(
    ({ article, title }: { article: string; title: string }) => {
      const sanitized = sanitizeHtml(article, { disallowedTagsMode: 'escape' });
      const newContent = CreateContentMock(
        randomUUID() as string,
        title,
        sanitized
      );

      contents = pipe(contents, append(newContent), toArray);
      return newContent;
    }
  );
  const putContent = delaiedFn((content: Content) => {
    let targetIndex = -1;
    if (0 > (targetIndex = findIndex((c) => c.id === content.id, contents)))
      return null;
    const sanitized = sanitizeHtml(content.article, {
      disallowedTagsMode: 'escape',
    });
    contents = replace(
      { ...content, article: sanitized },
      targetIndex,
      contents
    );
    return content;
  });

  const deleteContent = delaiedFn((id: string) => {
    let target: Content | undefined;
    if (isUndefined((target = find((c) => c.id === id, contents)))) return null;
    contents = pipe(
      contents,
      filter((c) => c.id !== target!.id),
      toArray
    );
    return id;
  });

  const getComments = delaiedFn((contentId: string) => {
    return pipe(
      comments,
      filter((comment) => comment.articleId === contentId),
      toArray
    );
  });

  const postComment = delaiedFn(
    (comment: { articleId: string; article: string }) => {
      const newComment = {
        ...comment,
        id: randomUUID() as string,
        createdAt: new Date().toUTCString(),
      };
      comments = pipe(comments, append(newComment), toArray);
      return newComment;
    }
  );

  const putComment = delaiedFn(
    ({
      article,
      articleId,
      id,
    }: Pick<Comment, 'article' | 'id' | 'articleId'>) => {
      let targetIndex = -1;
      if (
        0 >
        (targetIndex = findIndex(
          (c) => c.id === id && c.articleId === articleId,
          comments
        ))
      )
        return null;
      const newComment = { ...comments[targetIndex], article };
      comments = replace(newComment, targetIndex, comments);
      return newComment;
    }
  );

  const deleteComment = delaiedFn(
    ({ id, articleId }: Pick<Comment, 'articleId' | 'id'>) => {
      let target: Comment | undefined;
      if (
        isUndefined(
          (target = find(
            (c) => c.id === id && articleId === c.articleId,
            comments
          ))
        )
      )
        return null;
      comments = pipe(
        comments,
        filter((c) => c.id !== target!.id),
        toArray
      );
      return id;
    }
  );

  return {
    getContents,
    getContent,
    getComments,
    postContent,
    postComment,
    putContent,
    putComment,
    deleteContent,
    deleteComment,
    serverEqualize,
  };
})();

export default {
  ...db,
};
