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
     * 제목
     */
    title: string
    /**
     * 요약된 정보로 20글자 이내의 문자열을 가집니다. 
     */
    summary: string,
}
