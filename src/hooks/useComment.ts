import {
  deleteComment,
  getComments,
  postComment,
  putComment,
} from '@/api/handler/contents';
import { Comment } from '@/types/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { MutationHookOption } from './types';
import { deleteError, postError, putError } from './utils';

export const UNIQUE_KEY = (contentId: string) => [
  'CONTENTS',
  contentId,
  'Comment',
];

export function useCommentQuery({
  articleId,
  initialData = [],
}: {
  articleId: string;
  initialData?: Comment[];
}) {
  const q = useQuery<Comment[]>({
    queryFn: () => getComments(articleId),
    queryKey: UNIQUE_KEY(articleId),
    initialData,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  });

  return {
    ...q,
  };
}

export function useCreateComment({ onError = postError }: MutationHookOption) {
  const client = useQueryClient();

  const { mutateAsync, isLoading, isError } = useMutation({
    mutationFn: postComment,
    onSuccess: async (data) => {
      try {
        // 즉시 무효화 후 리패칭 시도
        await client.invalidateQueries(UNIQUE_KEY(data.articleId));
      } catch (error) {
        alert('데이터를 갱신하던 중 에러가 발생했습니다.');
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

export function usePutComment({ onError = putError }: MutationHookOption) {
  const client = useQueryClient();

  const { mutateAsync, isLoading, isError } = useMutation({
    mutationFn: putComment,
    onSuccess: async (data) => {
      try {
        // 즉시 무효화 후 리패칭 시도
        await client.invalidateQueries(UNIQUE_KEY(data.articleId));
      } catch (error) {
        alert('데이터를 갱신하던 중 에러가 발생했습니다.');
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

export function useDeleteComment({
  onError = deleteError,
}: MutationHookOption) {
  const client = useQueryClient();

  const { mutateAsync, isLoading, isError } = useMutation({
    mutationFn: deleteComment,
    onSuccess: async (_, variable) => {
      try {
        // 즉시 무효화 후 리패칭 시도
        await client.invalidateQueries(UNIQUE_KEY(variable.articleId));
      } catch (error) {
        alert('데이터를 갱신하던 중 에러가 발생했습니다.');
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
