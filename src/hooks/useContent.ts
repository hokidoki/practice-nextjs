import {
  deleteContent,
  getContent,
  postContent,
  putContent,
} from '@/api/handler/contents';
import { Content } from '@/types/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { UNIQUE_KEY as CONTENTS_UNIQUE_KEY } from './useContents';
import { MutationHookOption } from './types';
import { deleteError, postError, putError } from './utils';

export const UNIQUE_KEY = (contentId: string) => ['CONTENTS', contentId];

export function useContentQuery({
  contentId,
  initialData,
}: {
  contentId: string;
  initialData?: Content;
}) {
  /**
   * refetchOnWindowFocus는 confirm이후 window로 focus되면서 작동함
   */
  const q = useQuery<Content>({
    queryFn: () => getContent(contentId),
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    queryKey: UNIQUE_KEY(contentId),
    initialData,
  });

  return {
    ...q,
  };
}

export function useCreateContent({ onError = postError }: MutationHookOption) {
  const router = useRouter();
  const client = useQueryClient();

  const { mutateAsync, isLoading, isError } = useMutation({
    mutationFn: postContent,
    onSuccess: async (data) => {
      try {
        await client.invalidateQueries(CONTENTS_UNIQUE_KEY);
        router.push(`/contents/${data.id}`);
      } catch (error) {
        alert('데이터를 갱신하던 중 에러가 발생했습니다.');
        router.push('/contents');
      }
    },
    onError,
  });

  return {
    mutateAsync,
    isLoading,
    isError,
  };
}

export function usePutContent({ onError = putError }: MutationHookOption) {
  const router = useRouter();
  const client = useQueryClient();

  const { mutateAsync, isLoading, isError } = useMutation({
    mutationFn: putContent,
    onSuccess: async (data) => {
      try {
        await client.invalidateQueries(CONTENTS_UNIQUE_KEY);
        await client.invalidateQueries(UNIQUE_KEY(data.id));
        router.push(`/contents/${data.id}`);
      } catch (error) {
        alert('데이터를 갱신하던 중 에러가 발생했습니다.');
        router.push('/contents');
      }
    },
    onError,
  });

  return {
    mutateAsync,
    isLoading,
    isError,
  };
}

export function useDeleteContent({
  onError = deleteError,
}: MutationHookOption) {
  const router = useRouter();
  const client = useQueryClient();

  const { mutateAsync, isLoading, isError, isSuccess } = useMutation({
    mutationFn: deleteContent,
    onSuccess: async (data) => {
      try {
        const contentQueryKey = UNIQUE_KEY(data);
        client.setQueriesData(contentQueryKey, undefined);
        router.push(`/contents`);
      } catch (error) {
        alert('데이터를 갱신하던 중 에러가 발생했습니다.');
        router.push('/contents');
      }
    },
    onError,
  });

  return {
    mutateAsync,
    isLoading,
    isSuccess,
    isError,
  };
}
