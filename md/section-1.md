# Section-1

## SSR-CSR-SSG

### ssr

ssr은 블로그나 페이지에 사용되고 Java의 page template과 함께 사용한다.

페이지를 요청을 한 뒤, 완성된 HTML을 받는 것이 목적.

요청 -> 페이지 생성 -> 전달

사용자가 많을때는 페이지 부하가 있을 수 있다.

HTML이 그려진 상태로 응답이 오기때문에 크롤링에 적합하다.

### CSR

요청시 빈 HTML을 받지만 이후 스크립트에 의해서 돔이 렌더링된다.

요청 -> 페이지 전달 -> 스크립트 요청 -> 전달 -> DOM 렌더

페이지에 필요한 정보를 얻고자 할때는 서버에게 계속 요청해야 하기 때문에 보안에 취약하며 HTML이 스크립트에 의해 그려지기 때문에 크롤링에 취약하다.

페이지 깜빡임 없이 페이지내에서 이동 가능하다.

### SSG

빌드 시, 완성된 HTML을 만들어 요청 때마다 전달한다. 이는 크롤링에 적합하고, 미리 만들어진 문서를 서버에서 캐시 할 수 있기때문에 빠른 전달이 가능하다.

## Next.js를 사용하는 이유

SSR, CSR, SSG의 장점만을 고려하여, 페이지를 자유롭게 Routing/Rendering 할 수 있도록 API를 제공함

- SSR/SSG의 용량과 보안
  - 특정 페이지에 필요한 스크립트 및 css만 받을 수 있어 빠르다.
  - CSR처럼 페이지에 필요한 컨텐츠를 렌더링 하기위해, 컨텐츠를 서버로 계속 요청하지 않아도 되어 보안측면에서 우수하다.
- CSR의 페이지 이동 속도, 깜빡임 없음
  - CSR내부에서는 페이지 이동시 서버로 문서를 새로 요청후 렌더하는 것이 아니기 때문에 깜빡임이 없다.
  - 페이지를 요청하는 것이 아니기 때문에 페이지 이동이 더 빠르다.
- Next.js의 방향성

  - 위의 장점들을 이용해 새로운 기술을 사용하는 것이 방향성

- Prerendering -> Javascript/Disabled
  - CSR로 이루어진 사이트에서 자바스크립트를 비 활성화하면 렌더링 되지 않는다.
  - next.js를 이용해 만들어진 페이지에서는 자바스크립트를 비활성화해도 페이지가 렌더링 된 채로 전달되기 때문에 컨텐츠를 볼 수 있다.

## Directory구조

`pages` 폴더 구조는 페이지 요청 URL과 같다.

`pages/A/index.ts`경로와 `pages/A/a.ts`는 `${domain}/A` 와 `${domain}/A/a`과 같다.

## getStaticProps

`getStaticProps`는 정적인 페이지를 생성 할 때, 외부에서 필요한 데이터를 불러오거나 페이지의 설정들을 구성 할 수 있는 함수이다.

page 파일에서 `getStaticProps`함수를 선언하여 `export`하는 경우, `pre-render`에 필요한 데이터를 불러온 뒤, `page` 컴포넌트에 이 값을 전달 할 수 있다.

개발 환경에서는 매번 요청마다 getStaticProps에서 데이터를 새롭게 패칭하는데, 이는 개발 환경에서만 새롭게 데이터를 패칭하고 `yarn start`와 같은 `production`환경에서는 발생하지 않는다.

아래는 예시다.

```tsx
import React from "react";
import { delay } from "@/mock";

export async function getStaticProps() {
  const t = 2 * 1000;
  const data = await delay(Math.random(), t);

  return {
    props: {
      data,
    },
  };
}

interface Props {
  data: number;
}

export default function Example({ data }: Props) {
  return (
    <div>
      <h1>getStaticProps</h1>
      <div>Data :{data}</div>
    </div>
  );
}
```

`getStaticProps`에서 props를 컴포넌트로 전달 해주기 위해서는 반환하는 객체에 `props` 프로퍼티가 존재해야 한다.

### Revalidation - ISR

`SSG`는 배포된 이후 패칭된 데이터들이 변경되지 않는다면 사용하기 적합하다. 그러나, 상황에 따라 API의 결과가 변경될때가 있다. 이럴때마다 사이트를 재 배포하거나 `SSR`을 사용하거나 `SSR`의 방식을 사용하기에는 `SSG`의 장점이 너무 아쉽다.
그렇기에, `next.js`에서는 `getStaticProps` 함수가 반환하는 객체에 `revalidation` 속성을 제공하는데, 이 기능은 빌드가 완료된 페이지에서 정적으로 생성된 페이지를 업데이트 할 수 있도록 제공해준다.

`revalidate` 속성을 5초로 설정하고, 새로고침을 해보면 5초동안은 캐시가 적중하지만 이후 `STALE`(상태가 Fresh하지 않은 상태)로 변경된다. 서버에서는 `STALE`상태가 된 페이지의 `getStaticProps` 함수를 재 호출하고 이전 값과 비교후에, 새로운 `pre-render`여부를 결정한다.

```tsx
export async function getStaticProps() {
  const t = 2 * 1000;
  const data = await delay(Math.random(), t);

  return {
    props: {
      data,
    },
    revalidate: 5,
  };
}
```

만약 다음과 같이 전달되는 props의 값이 동일하다면, 페이지가 재생성되지 않는다.

```tsx
export async function getStaticProps() {
  const t = 2 * 1000;
  const data = await delay(1, t);

  return {
    props: {
      data,
    },
    revalidate: 5,
  };
}
```
