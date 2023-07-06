# section-4

## getStaticPaths

`getStaticPaths`는 페이지의 경로를 정적으로 만들어 놓을 수 있는 함수이다.

### fallback

`getStaticProps`의 `revalidate`속성이 있는 것 처럼 빌드 때 만들어 놓은 경로이외가 만들어 질 수 있다. 이러한 상황을 위해서, `fallback`이라는 속성을 두고 있다.

- true : 정적으로 만들어 놓은 경로외에 접근하면, `getStaticProps`를 호출하여 반환하는 객체의 `notFound` 여부에 따라 `404`를 확인한다. 만약 첫사용자가 접근하면, 정적으로 파일을 생성한다.
  - `useRouter`의 `isFallback`속성이 `true`로 변경되며, 이를 이용해, 'fallback UI '를 생성 할 수 있다.
- false : 정적으로 만들어 놓은 경로외에 접근하면 바로 `404`를 리턴한다.
- "blocking" : `true`속성과 동작은 같지만 `getStaticProps`가 반환될때까지 `pre-render`를 하지 않는다.
