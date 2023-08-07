import { getContents } from "@/api/handler/contents";
import { useQuery } from "@tanstack/react-query";

/**
 * CONTENTS LIST QUERY KEY
 */
export const UNIQUE_KEY = ["CONTENTS"];

export function useContents() {
    const q = useQuery({
        queryFn: getContents,
        refetchOnMount: true,
        queryKey: UNIQUE_KEY,
        initialData: []
    });

    return { ...q }
}