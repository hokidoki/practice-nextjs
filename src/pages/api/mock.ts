import { POST } from '@/api/base';
import DB from '@/msw/DB';
import { Content, Comment } from '@/types/api';
import type { NextApiRequest, NextApiResponse } from 'next'



export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    if (!process.env.NEXT_PUBLIC_API_MOCKING) {
        res.status(404).redirect("/404")
        return;
    }

    /**
     * Developer Handling
     */
    const body = req.body as { contents: Content[], comments: Comment[] };
    await POST("/equalizer", body);
    res.status(200).send("OK")

}
