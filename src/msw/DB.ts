import { pipe, delay, slice, join, map, find, append, toArray, filter, isUndefined, findIndex } from "@fxts/core";
import { staticComments, staticContents } from "./datas";
import { Content, MinContent, Comment } from "@/types/api";
import { v4 as randomUUID } from "uuid";



const db = (() => {
    const tenMil = 10;
    const summaryLength = 20;
    const convertSummary = (str: string) => pipe(str, slice(0, summaryLength), join(""));
    const convertMinContent = (c: Content): MinContent => pipe(c, ({ id, title, createdAt, article }) => ({
        id,
        title,
        createdAt,
        summary: convertSummary(article)
    }))
    const replace = <T>(target: T, targetIndex: number, arr: T[]) => [
        ...toArray(slice(0, targetIndex, arr)),
        target,
        ...toArray(slice(targetIndex, arr.length, arr)),
    ]
    /**
     * 네트워크 딜레이
     */
    const delaiedFn = <T, P>(fn: (arg1: T) => P) => {
        return async (arg1: T) => {
            await delay(tenMil);
            return fn(arg1)
        }
    }

    let contents = [...staticContents];
    let comments = [...staticComments];

    const getContents = delaiedFn<void, MinContent[]>(() =>
        pipe(
            contents,
            map(convertMinContent),
            toArray
        )
    )

    const getContent = delaiedFn((id: string) => find((c) => c.id === id, contents))
    const postContent = delaiedFn((content: Content) => {
        contents = pipe(contents, append({ ...content, id: randomUUID() as string, createdAt: new Date().toUTCString() }), toArray);
        return content;
    })
    const putContent = delaiedFn((content: Content) => {
        let targetIndex = -1;
        if (0 > (targetIndex = findIndex((c) => c.id === content.id, contents))) return null;
        contents = replace(content, targetIndex, contents)
        return content;
    })

    const deleteContent = delaiedFn((id: string) => {
        let target: Content | undefined;
        if (isUndefined(target = find(c => c.id === id, contents))) return null;
        contents = pipe(contents, filter((c) => c.id !== target!.id), toArray);
        return id;
    })

    const getComments = delaiedFn((contentId: string) => {
        return pipe(
            comments,
            filter(comment => comment.articleId === contentId),
            toArray
        )
    })

    const postComment = delaiedFn((comment: Comment) => {
        comments = pipe(comments, append({ ...comment, id: randomUUID() as string, createdAt: new Date().toUTCString() }), toArray);
        return comments;
    })

    const putComment = delaiedFn((comment: Comment) => {
        let targetIndex = -1;
        if (0 > (targetIndex = findIndex((c) => c.id === comment.id, comments))) return null;
        comments = replace(comment, targetIndex, comments)
        return comment;
    })

    const deleteComment = delaiedFn((id: string) => {
        let target: Comment | undefined;
        if (isUndefined(target = find(c => c.id === id, comments))) return null;
        comments = pipe(comments, filter((c) => c.id !== target!.id), toArray);
        return id;
    })

    return {
        getContents,
        getContent,
        getComments,
        postContent,
        postComment,
        putContent,
        putComment,
        deleteContent,
        deleteComment
    }
})()

export default {
    ...db
}