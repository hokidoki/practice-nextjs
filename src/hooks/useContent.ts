import { deleteContent, getContent, postContent, putContent } from "@/api/handler/contents";
import { Content } from "@/types/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { UNIQUE_KEY as CONTENTS_UNIQUE_KEY } from "./useContents";

export const UNIQUE_KEY = (contentId: string) => ["CONTENTS", contentId];

export function useContentQuery({ contentId, initialData, enabled }: { enabled: boolean, contentId: string, initialData: Content }) {

    const q = useQuery<Content>({
        queryFn: () => getContent(contentId),
        enabled,
        refetchOnMount: false,
        refetchOnReconnect: false,
        queryKey: UNIQUE_KEY(contentId),
        initialData,
    })

    return {
        ...q
    }
}

export function useCreateContent() {
    const router = useRouter();
    const client = useQueryClient();

    const { mutateAsync, isLoading, isError } = useMutation({
        mutationFn: postContent,
        onSuccess: async (data) => {
            try {
                await client.invalidateQueries(CONTENTS_UNIQUE_KEY);
                router.push(`/contents/${data.id}`)

            } catch (error) {
                alert("데이터를 갱신하던 중 에러가 발생했습니다.");
                router.push('/contents')
            }

        }
    })

    return {
        mutateAsync,
        isLoading,
        isError
    }
}

export function usePutContent() {
    const router = useRouter();
    const client = useQueryClient();

    const { mutateAsync, isLoading, isError } = useMutation({
        mutationFn: putContent,
        onSuccess: async (data) => {
            try {
                await client.invalidateQueries(CONTENTS_UNIQUE_KEY);
                await client.invalidateQueries(UNIQUE_KEY(data.id));
                router.push(`/contents/${data.id}`)
            } catch (error) {
                alert("데이터를 갱신하던 중 에러가 발생했습니다.");
                router.push('/contents')
            }
        }
    })

    return {
        mutateAsync,
        isLoading,
        isError
    }
}

export function useDeleteContent() {
    const router = useRouter();
    const client = useQueryClient();

    const { mutateAsync, isLoading, isError, isSuccess } = useMutation({
        mutationFn: deleteContent,
        onSuccess: async (data) => {
            try {
                const contentQueryKey = UNIQUE_KEY(data);
                client.invalidateQueries(CONTENTS_UNIQUE_KEY);
                client.removeQueries(contentQueryKey);
                client.resetQueries(contentQueryKey)
                router.push(`/contents`);
            } catch (error) {
                alert("데이터를 갱신하던 중 에러가 발생했습니다.");
                router.push('/contents')
            }
        }
    })

    return {
        mutateAsync,
        isLoading,
        isSuccess,
        isError
    }
}