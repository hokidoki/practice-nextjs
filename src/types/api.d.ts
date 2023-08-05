/**
 * 유저 정보
 * @interface
 */
export interface User {
    id: string,
    nickname: string
}
/**
 * 컨텐츠의 요약된 정보.
 * @interface
 */
export interface MinContent {
    /**
     * Content의 ID
     */
    id: string,
    /**
     * 글 제목
     */
    title: string
    /**
     * 글 작성자
     */
    author: User,
    /**
     * 요약된 정보로 20글자 이내의 문자열을 가집니다. 
     */
    summary: string,
    /**
     * 작성 날짜
     */
    createdAt: string,
}
/**
 * 온전한 컨텐츠 정보
 * @interface
 */
export interface Content extends Omit<MinContent, "summary"> {
    article: string,
}
/**
 * 댓글 정보
 * @interface
 */
export interface Comment extends Content {
    articleId: string
}