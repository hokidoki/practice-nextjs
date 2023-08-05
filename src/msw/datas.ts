import { Content, User, Comment } from "@/types/api"
import { range, map, pipe, toArray, flat } from "@fxts/core"
import { randomUUID } from "crypto"

const randomInt = (max: number = 10) => Math.floor((Math.random()) * max);
const CreateUserMock = (id: string, nickname: string) => ({ id, nickname })
const CreateContentMock = (title: string, article: string, author: User,): Content => ({
    id: randomUUID(),
    title,
    author,
    article,
    createdAt: new Date().toUTCString()
})
const CreateCommentsMock = (articleId: string, title: string, article: string, author: User): Comment => ({
    id: randomUUID(),
    articleId,
    title,
    article,
    author,
    createdAt: new Date().toUTCString()
})


const CreateRandomLengthComment = (content: Content, author: User) => pipe(
    range(randomInt(10)),
    map((i) => CreateCommentsMock(content.id, `commnet-title-${i}`, `comment-${i}`, author)),
    toArray
)

export const staticUsers: User[] = [
    CreateUserMock("culture", "hero"),
    CreateUserMock("lee", "jh")
]

export const staticContents: Content[] = pipe(
    range(10),
    map((index) => CreateContentMock(`Title - ${index}`, `Article - ${index}`, staticUsers[index % 2])),
    toArray);

export const staticComments: Comment[] = pipe(
    staticContents,
    map((content) => CreateRandomLengthComment(content, staticUsers[randomInt() % 2])),
    flat,
    toArray
)