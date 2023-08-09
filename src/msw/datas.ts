import { Content, Comment } from '@/types/api';
import { range, map, pipe, toArray, flat } from '@fxts/core';

export const CreateContentMock = (
  id: string,
  title: string,
  article: string
): Content => ({
  id,
  title,
  article,
  createdAt: new Date().toUTCString(),
});
const CreateCommentsMock = (
  id: string,
  articleId: string,
  article: string
): Comment => ({
  id,
  articleId,
  article,
  createdAt: new Date().toUTCString(),
});

const CreateRandomLengthComment = (content: Content) =>
  pipe(
    range(5),
    map((i) => CreateCommentsMock(i.toString(), content.id, `commnet-${i}`)),
    toArray
  );

export const staticContents: Content[] = pipe(
  range(10),
  map((index) =>
    CreateContentMock(
      index.toString(),
      `Title - ${index}`,
      `Article - ${index}`
    )
  ),
  toArray
);

export const staticComments: Comment[] = pipe(
  staticContents,
  map((content) => CreateRandomLengthComment(content)),
  flat,
  toArray
);
