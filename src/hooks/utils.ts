import { curry } from '@fxts/core';

export const mutationDefaultError = (method: string) =>
  curry((overwrite?: string) =>
    alert(overwrite ? overwrite : `${method} 중 에러가 발생하였습니다.`)
  );
export const postError = mutationDefaultError('생성');
export const putError = mutationDefaultError('수정');
export const deleteError = mutationDefaultError('삭제');
