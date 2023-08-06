import { getComments, getContent } from "@/api/handler/contents";
import { Comment } from "@/types/api";
import { useMutation, useQuery } from "@tanstack/react-query";

export const UNIQUE_KEY = (contentId: string) => [contentId, "Comment"];

export function useCommentQuery(contentId: string, initialData: Comment[]) {

    const q = useQuery<Comment[]>({
        queryFn: () => getComments(contentId),
        refetchOnMount: false,
        queryKey: UNIQUE_KEY(contentId),
        initialData
    })

    return {
        ...q
    }
}


