import { test } from "@/api/contents";
import { useQuery } from "@tanstack/react-query";

/**
 * CONTENTS LIST QUERY KEY
 */
export const UNIQUE_KEY = ["CONTENTS"];

export function useContents() {
    const q = useQuery({
        queryFn: test,
        refetchOnMount: false,
        queryKey: UNIQUE_KEY,
        initialData: []

    });

    return { ...q }
}