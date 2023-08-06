import DB from "@/msw/DB";
import { BASE_URL } from "@/api/base";
import { pathmaker } from "@/api/utils";
import { Content } from "@/types/api";
import { rest } from "msw";

export const path = pathmaker(BASE_URL + "/contents");
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

const putContent: Parameters<typeof rest.get>[1] = async (req, res, ctx) => {
    const content = await req.json<Content>().catch(e => Promise.reject(e));
    if (content instanceof Promise) return res(
        ctx.status(400)
    )

    const data = await DB.putContent(content).then((c) => c === null ? Promise.reject(new Error("Not Match id")) : c).catch(e => Promise.reject(e));

    if (content instanceof Promise) return res(
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

const postContent: Parameters<typeof rest.get>[1] = async (req, res, ctx) => {

    const content = await req.json<Content>().catch(e => Promise.reject(e));

    if (content instanceof Promise) return res(
        ctx.status(400)
    )

    const data = await DB.postContent(content).catch(e => Promise.reject(e));
    // 
    if (content instanceof Promise) return res(
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
export default [
    rest.get(path(""), getContentsList),
    rest.get(path(":contentId"), getContent),
    rest.post(path(""), postContent),
    rest.put(path(":contentId"), putContent),
    rest.get(path(":contentId", "comments"), getComments)
]