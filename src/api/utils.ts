import { curry, join } from "@fxts/core";


/**
 * API Handler에서 사용되는 path 생성기
 */
export const pathmaker = (base_path: string) => (...args: string[]) => base_path + curry(join("/"))(args);