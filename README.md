# Culture Hero

## 실행 방법

```
$ : yarn
$ : yarn postinstall
$ : yarn dev
```

## 주요 구현 내용 및 Page Route

하이드레이트 기법을 사용해서, 전역상태로 서버데이터를 관리할 수 있게 했습니다.

1. /
   1. contents로 redirect. - [x]
2. /contents
   1. 게시물 리스트
      1. contents/:id로 이동 가능
   2. /editor 로 이동 가능
3. /contents/:id
   1. 특정 게시물 확인
   2. 댓글 리스트 제공
      1. 댓글 수정 및 삭제 기능 제공
   3. 댓글 작성 입력폼 제공
   4. 게시물 삭제 기능
4. /editor
   1. 새 게시물 작성
5. /editor/:id
   1. 기존 게시물 수정

## 고민된 부분

1. 보통의 경우라면, 세션과 쿠키를 이용해서 게시물에 대한 권한을 조정하여야 하나, 테스트코드이기에, 이를 구현하지 않고 최대한 가볍게 준비하는 것으로 결정하였습니다.
2. 삭제 여부를 confirm으로 동작케 하는데, 확인 버튼클릭후 query들이 다시 리패칭되었습니다. 확인해보니 alert이나 confirm이후 windowFocus가 될때 리패칭되는 것을 확인 후, 조치하였습니다.
