# Culture Hero

## Page Route

1. /
   1. contents로 redirect. - [x]
2. /contents
   1. 게시물 리스트
      1. contents/:id로 이동
   2. 서버사이드로 렌더링
   3. 게시물 작성페이지로 이동
3. /contents/:id
   1. 특정 게시물
   2. 렌더링 방식 아직 미정
   3. 댓글 리스트 제공
      1. 댓글 수정 및 삭제 기능 제공
   4. 댓글 작성 입력폼 제공
   5. 게시물 삭제 기능
4. /editor
   1. 새 게시물 작성
5. /editor/:id
   1. 기존 게시물 수정 기능
