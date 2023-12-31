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

## Link

`CSR`의 경우, 모든 페이지에 대한 정보가 'script'파일에 존재하기 때문에 스크립트 파일이 굉장히 무겁다. 이와 반대로 `SSR` or `SSG`로 생성된 페이지는 해당 페이지에 대한 정보만을 가지고 있기 때문에, 굉장히 가벼운 것이 장점이다.

보통 `SSG` or `SSR`은 다른 페이지에 대한 정보가 존재하지 않기 때문에, `a`로 페이지 이동시 화면 깜빡임과 동시에 서버로부터 HTML, css, javascript 파일들을 추가로 요청하게 된다. 그러나, `next.js`의 `next/link`를 이용하면, 페이지 이동시 `CSR`과 같이 동작하여 화면 깜빡임 없이 동작해 더 부드러운 이동이 가능하다.

`next/link`를 사용하면, 화면상에 `Link`컴포넌트가 존재 할 때, 서버로부터 이동가능한 경로의 `JSON`(화면에 필요한 데이터를 패칭한 `getStaticProps` 반환 값) 파일과 `JS`(컴포넌트 구성 정보)파일들을 서버로부터 요청하게 된다. (클라이언트 영역 밖으로 링크가 있으면, 서버로 부터 이동 가능한 경로의 `js`파일과 `json` 파일을 요청하지 않는다.)

`next/link`의 사용방법은 다음과 같다.

```tsx
import React from "react";
import Link from "next/link";

export default function links() {
  return (
    <main>
      <h1>Links</h1>
      <Link href="/section1/getStaticProps">/getStaticProps</Link>
    </main>
  );
}
```

다음 예시코드는 `js`와 `json`이 클라이언트 렉트에서 존재할때만 패칭이 된다는 것을 확인 할 수 있는 예시이다.

```tsx
export default function links() {
  return (
    <main>
      <h1>Links</h1>
      <div style={{ height: "200vh" }} />
      <Link href="/section1/getStaticProps">/getStaticProps</Link>
    </main>
  );
}
```

`a` 태그를 링크로 사용하게 되면, 더 이상 이동가능한 경로의 `js`파일과 `json`파일을 패칭하지 않게된다.

```tsx
export default function links() {
  return (
    <main>
      <h1>Links</h1>
      <div style={{ height: "200vh" }} />
      <a href="/section1/getStaticProps">/getStaticProps</a>
      {/* <Link href="/section1/getStaticProps">/getStaticProps</Link> */}
    </main>
  );
}
```

### natvie a props

Link태그는 `a`태그를 완전히 대체 할 수 있기에, `a`태그에서 사용가능한 props를 그대로 사용가능하다.

**Note** `Link`태그 내부에 `a`태그가 전달되는 것은 `legacyBehavior`속성을 사용 했을 때만 가능하다.

다음은 `Link`태그에 `style` props를 적용한 예시이다.

```tsx
export default function links() {
  return (
    <main>
      <h1>Links</h1>
      <div style={{ height: "200vh" }} />
      <Link style={{ color: "red" }} href="/section1/getStaticProps">
        /getStaticProps
      </Link>
    </main>
  );
}
```

### legacyBehavior

`v12`버전에서는 `Link` 컴포넌트의 자식으로 `a`태그를 전달하였지만 `v13`에서는 `link` 컴포넌트가 `a`태그를 완전히 대체할 수 있게 되어 `Link`컴포넌트 단독으로 사용된다.

`v12`의 사용방법을 그대로 `Link`에 적용하고자 할 때는 `legacyBehavior` props를 사용하면 된다.

`legacyBehavior`속성을 사용하면, `Link`가 더 이상 `a`태그를 대체 하지 않기 때문에, `style`과 같은 속성을 사용하려면 자식인 `a`태그에게 전달해야 한다.

## useRouter 기초

`useRouter`는 `Link`의 기능을 수동으로 작성하는 것과 동일하다. 그렇기에, `a`태그가 아닌 다른 요소를 링크로 활용할 때 주로 사용된다.

다음은 `button`을 이용해, 라우팅을 구현한 예시이다.

```tsx
import { useRouter } from "next/router";

export default function links() {
  const router = useRouter();

  return (
    <main>
      <h1>Links</h1>
      {/* <div style={{ height: "200vh" }} /> */}
      <button onClick={() => router.push("/section1/getStaticProps")}>
        GetStaticProps
      </button>
    </main>
  );
}
```

`Link`태그와 달리 `useRouter`는 `pre-fetch`를 자동으로 하지 않으며, 사용자가 직접 구성해야 한다. (prefetch 기능은 production 환경에서만 동작)

```tsx
import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function links() {
  const router = useRouter();
  const link = "/section1/getStaticProps";

  useEffect(() => {
    router.prefetch(link);
  }, []);

  return (
    <main>
      <h1>Links</h1>
      {/* <div style={{ height: "200vh" }} /> */}
      <button onClick={() => router.push(link)}>GetStaticProps</button>
    </main>
  );
}
```

## .next 기본

`.next` 폴더는 `next build`명령어로 생성된 폴더이다. 이 폴더는 서버가 실행되었을 때 필요한 코드들의 집합이다.

### static/chunks/pages/\*

`static/chunks/pages` 경로에는 `pages`에서 작성된 페이지들을 렌더링 하기 위한 `js`파일들이 존재한다.

파일의 이름은 `{filename}-{hash}`형태를 가지며 변경되지 않는다.

### server/pages/\*

`server/pages`경로에는 `pre-rendering`된 `html`파일과 `getStaticProps`로 패칭된 `json` 및 서버가 페이지를 재 생성할 때 필요한 `js`파일들이 존재한다.

## getServerSideProps

`getServerSideProps`는 `SSR`을 지원하는 페이지에서 사용되는 함수로써 `getStaticSideProps`와 모습이 매우 유사하다. 다만 `SSR`의 특성상 페이지가 요청될 때마다 서버에서는 `pre-render`를 진행해야 하기에, 사용자 경험이 좋지 않다.

다음과 같은 상황에서 적합하다.

1. 사용자 인증정보에 따라 다르게 보여주어야 하는 페이지
2. 페이지가 동적으로 변경되지만 보안이 중요한 페이지.

다음은 예시코드이다.

```tsx
import React from "react";
import { delay } from "@/mock";
import { GetServerSidePropsContext } from "next";

export async function getServerSideProps({ res }: GetServerSidePropsContext) {
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
      <h1>getServerSideProps</h1>
      <div>Data :{data}</div>
    </div>
  );
}
```

### Cache-control header

`getServerSideProps`에서도 `configuration`파라메터의 `res.setHeader`를 이용하여 `revalidate`와 동일한 기능을 구현할 수 있다.

`Cache-control` 헤더에 `s-maxage`와 `stale-while-ravalidate` 값을 지정 할 수 있는데, 각 용도는 다음과 같다.

- public : 모든 사람과 중간 서버가 캐시를 저장 할 수 있다. (반대는 private)
- s-maxage : 이전 요청으로 부터 {x}초 이내에 반복되는 경우, 캐시된 값은 여전히 최신 상태이다. (재검증 없이 사용됨)
- stale-while-revalidate : s-maxage에서 {x}초 이내에 요청되는 경우, 캐시된 문서를 전달하지만 백그라운드에서 최신화를 진행한다.
  - 이 값을 초과한 뒤 요청이 되면 캐싱된 값은 `Stale` 상태가 되고, 서버에서 `pre-render`가 완료될 때 까지 `pending` 상태가 된다.

```tsx
import React from "react";
import { delay } from "@/mock";
import { GetServerSidePropsContext } from "next";

export async function getServerSideProps({ res }: GetServerSidePropsContext) {
  const t = 2 * 1000;
  const data = await delay(Math.random(), t);

  res.setHeader(
    `Cache-control`,
    `public , s-maxage=5, stale-while-revalidate=10`
  );

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
      <h1>getServerSideProps</h1>
      <div>Data :{data}</div>
    </div>
  );
}
```

## Client-side-render

`CSR`은 page에서 export 되는 `getServerSideProps`나 `getStaticProps`를 제거한 뒤, page를 `export default`키워드에 전달하면된다.

`page`에서 작동하는 동적인 부분은 모두 `hook`에서 동작해야 한다.

만약 동기적 코드이지만 `pre-render`당시, 알 수 없는 값들이 사용되는 컴포넌트들은 `dynamic` 함수를 이용해, `ssr`때 사용되지 않고 스크립트가 동작할 때 렌더링 되도록 해야한다.

아래는 예시코드이다.

```tsx
import React, { useEffect, useState } from "react";
import { delay } from "@/mock";
import dynamic from "next/dynamic";

const NoSSR = dynamic(() => import("@/components/NoSSR"), {
  ssr: false,
});

export default function Example() {
  const [data, setData] = useState(0);

  useEffect(() => {
    const t = 2 * 1000;
    delay(Math.random(), t).then(setData);
  }, []);

  return (
    <div>
      <h1>getServerSideProps</h1>
      <div>Data :{data}</div>
      <NoSSR />
    </div>
  );
}
```
