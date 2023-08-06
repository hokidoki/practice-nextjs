import { getContent } from "@/api/handler/contents";
import { Content } from "@/types/api";
import { useMutation, useQuery } from "@tanstack/react-query";

export const UNIQUE_KEY = (contentId: string) => ["CONTENTS", contentId];

export function useContentQuery(contentId: string, initialData: Content) {

    const q = useQuery<Content>({
        queryFn: () => getContent(contentId),
        refetchOnMount: false,
        queryKey: UNIQUE_KEY(contentId),
        initialData
    })

    return {
        ...q
    }
}


