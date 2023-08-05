import { Content, Comment } from "@/types/api"
import { range, map, pipe, toArray, flat } from "@fxts/core"
import { v4 as randomUUID } from "uuid";

const randomInt = (max: number = 10) => Math.floor((Math.random()) * max);

const CreateContentMock = (title: string, article: string): Content => ({
    id: randomUUID(),
    title,
    article,
    createdAt: new Date().toUTCString()
})
const CreateCommentsMock = (articleId: string, title: string, article: string): Comment => ({
    id: randomUUID(),
    articleId,
    article,
    createdAt: new Date().toUTCString()
})

const CreateRandomLengthComment = (content: Content) => pipe(
    range(randomInt(10)),
    map((i) => CreateCommentsMock(content.id, `commnet-title-${i}`, `comment-${i}`)),
    toArray
)

export const staticContents: Content[] = pipe(
    range(10),
    map((index) => CreateContentMock(`Title - ${index}`, `Article - ${index}`)),
    toArray);

export const staticComments: Comment[] = pipe(
    staticContents,
    map((content) => CreateRandomLengthComment(content)),
    flat,
    toArray
)