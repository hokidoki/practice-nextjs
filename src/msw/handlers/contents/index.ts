import DB from "@/msw/DB";
import { BASE_URL } from "@/api/base";
import { pathmaker } from "@/api/utils";
import { Content, Comment } from "@/types/api";
import { rest } from "msw";

export const path = pathmaker(BASE_URL + "/contents");

const clientEqualize: Parameters<typeof rest.post>[1] = async (req, res, ctx) => {
    const data = await req.json<{ contents: Content[], comments: Comment[] }>().catch(e => Promise.reject(e));
    await DB.serverEqualize(data);

    return res(
        ctx.status(200),
        ctx.json({
            message: "OK",
        })
    );
};


/**
 * response data type : Min_Content[]
 */
const getContentsList: Parameters<typeof rest.get>[1] = async (_, res, ctx) => {
    return res(
        ctx.status(200),
        ctx.json({
            message: "OK",
            data: await DB.getContents()
        })
    );
};

const getContent: Parameters<typeof rest.get>[1] = async (req, res, ctx) => {

    const { contentId } = req.params;

    if (!contentId) return res(
        ctx.status(400)
    )

    const data = await DB.getContent(contentId as string);


    if (!data) return res(
        ctx.status(404)
    )

    return res(
        ctx.status(200),
        ctx.json({
            message: "OK",
            data
        })
    );
};
const postContent: Parameters<typeof rest.post>[1] = async (req, res, ctx) => {

    const content = await req.json<Content>().catch(e => Promise.resolve(null));

    if (content === null) return res(
        ctx.status(400)
    )

    const data = await DB.postContent(content).catch(e => Promise.resolve(null));

    if (content === null) return res(
        ctx.status(500)
    )

    return res(
        ctx.status(200),
        ctx.json({
            message: "OK",
            data
        })
    );
};

const putContent: Parameters<typeof rest.put>[1] = async (req, res, ctx) => {
    const content = await req.json<Content>().catch(e => Promise.resolve(null));
    if (content === null) return res(
        ctx.status(400)
    )
    const data = await DB.putContent(content).catch(e => Promise.resolve(null));
    if (data === null) return res(
        ctx.status(500)
    )

    return res(
        ctx.status(200),
        ctx.json({
            message: "OK",
            data
        })
    );
};

const deleteContent: Parameters<typeof rest.delete>[1] = async (req, res, ctx) => {
    const { contentId } = req.params;
    if (typeof contentId !== "string") return res(
        ctx.status(400)
    )
    const data = await DB.deleteContent(contentId).catch(e => Promise.reject(null));
    if (data === null) return res(
        ctx.status(500)
    )

    return res(
        ctx.status(200),
        ctx.json({
            message: "OK",
            data
        })
    );
};


const getComments: Parameters<typeof rest.get>[1] = async (req, res, ctx) => {
    const { contentId } = req.params;

    if (typeof contentId !== "string") return res(
        ctx.status(400)
    )

    return res(
        ctx.status(200),
        ctx.json({
            message: "OK",
            data: await DB.getComments(contentId)
        })
    )
}
const postComment: Parameters<typeof rest.post>[1] = async (req, res, ctx) => {

    const parsedBody = await req.json<{ article: string }>().catch(e => Promise.resolve(null));
    const { contentId } = req.params;
    if (parsedBody === null || typeof contentId !== "string") return res(
        ctx.status(400)
    )
    const { article } = parsedBody;

    const data = await DB.postComment({ article, articleId: contentId }).catch(e => Promise.resolve(null));

    if (data === null) return res(
        ctx.status(500)
    )

    return res(
        ctx.status(200),
        ctx.json({
            message: "OK",
            data
        })
    );
};

const putConmment: Parameters<typeof rest.put>[1] = async (req, res, ctx) => {
    const { contentId: articleId, commentId: id } = req.params;

    if (typeof articleId !== "string" || typeof id !== "string") return res(
        ctx.status(400)
    )

    const { article } = await req.json<{ article: string }>().catch(e => Promise.resolve({ article: null }));
    if (article === null) return res(
        ctx.status(400)
    )
    const data = await DB.putComment({ id, articleId, article }).catch(e => Promise.resolve(null));
    if (data === null) return res(
        ctx.status(500)
    )

    return res(
        ctx.status(200),
        ctx.json({
            message: "OK",
            data
        })
    );
};

const deleteComment: Parameters<typeof rest.delete>[1] = async (req, res, ctx) => {
    const { contentId: articleId, commentId: id } = req.params;

    if (typeof articleId !== "string" || typeof id !== "string") return res(
        ctx.status(400)
    )


    const data = await DB.deleteComment({ id, articleId }).catch(e => Promise.resolve(null));
    if (data === null) return res(
        ctx.status(500)
    )

    return res(
        ctx.status(200),
        ctx.json({
            message: "OK",
            data
        })
    );
};

export default [
    rest.post(BASE_URL + "/equalizer", clientEqualize),
    rest.get(path(""), getContentsList),
    rest.get(path(":contentId"), getContent),
    rest.post(path(""), postContent),
    rest.put(path(":contentId"), putContent),
    rest.delete(path(":contentId"), deleteContent),
    rest.get(path(":contentId", "comments"), getComments),
    rest.post(path(":contentId", "comments"), postComment),
    rest.put(path(":contentId", "comments", ":commentId"), putConmment),
    rest.delete(path(":contentId", "comments", ":commentId"), deleteComment),
]
