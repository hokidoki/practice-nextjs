# section-2

## native image

image 태그를 사용하게 되면, 이지가 보이지 않더라도 이미지를 로드한다. 이미지를 레이지하게 로딩하게 하려면 `loading='lazy'`로 지정한다.

```tsx
<figure>
  <img
    src="https://lecture-1.vercel.app/example.jpg"
    alt="example"
    width={500}
    height={100}
    loading="lazy"
  />
  <figcaption>example img</figcaption>
</figure>
```

## Next/image

`next/image`를 사용 할 때, 이미지의 크기가 고정되어 있다면 `width` or `height` 속성을 사용해야 한다.

### 최적화

`lazyloading`을 지원한다.

`next/image`를 사용하게 되면 `img`태그와 다르게 서버에서 이미지를 `webp`형식으로 제공하게 된다. `webp` 형식을 사용하기에 원본보다 훨씬 적은 용량으로 다운로드 할 수 있다.

`quality` 속성으로 이미지를 최적화 할 수 있다. (기본값은 75)

`placeholder="blur"` 속성을 적용하고 `production`환경에서 실행해보면 이미지가 다운로드 되는 동안, `placeholder` 배경을 제공한다. 이것이 가능한 이유는 이미지를 `static`하게 `import`하였기 때문이다.

```tsx
<figure>
  <Image
    src={example}
    alt="v13 image"
    width={500}
    height={100}
    placeholder="blur"
  />
  <figcaption>v13 image</figcaption>
</figure>
```

### 외부 링크 사용방법

외부 링크를 `src`로 전달할 때 `width` 와 `height` 속성을 제공하지 않으면 에러를 발생하는데, 이 이유는 정적으로 이미지를 제공할 수 없기 때문이다.

```tsx
<figure>
  <Image
    src={"http://domain/example.jpg"}
    alt="v13 image"
    width={500}
    height={100}
    // placeholder="blur"
  />
  <figcaption>v13 image</figcaption>
</figure>
```

만약 외부 링크를 사용하고, 이미지의 크기를 모르는 경우일 때는 `fill=true`속성을 적용해야한다. 이 속성을 적용하면 이미지는 `position=absolute` 과 `width=100` , `height=100`스타일을 적용하게 된다.

이미지가 크기와 높이의 영향으로 왜곡되어 보인다면 `style` 속성을 이용하여, `object-fit`속성을 활용 할 수 있다.

다음은 예시코드이다.

```tsx
<figure style={{ position: "relative", width: "500px", height: "100px" }}>
  <Image
    src="https://lecture-1.vercel.app/example.jpg"
    alt="v13 fill"
    fill
    style={{ objectFit: "cover" }}
  />
</figure>
```

**중요** : 외부 이미지를 사용할 때 도메인으로 인한 에러를 볼 수 있는데 이는 `next/image`가 보안상의 이유로 다른 도메인을 허용하지 않아 발생하는 것이다. 이를 해결하기 위해서는 `next.config.js`에서 `domain`속성으로 외부 도메인을 허용해야한다.

### next/legacy/image

**중요** : v13으로 이전되면서, v12의 `next/image` 는 `next/legacy/image`로 이동되었다.

기존 이미지태그와 달리 `span`으로 감싸진 `img`가 렌더링 된다. 이때 이미지는 `span`을 기준으로 사용된다.

기존과 달리 `next/legacy/image`는 `layout`속성을 반드시 설정해주어야 된다. `layout`을 지정하지 않았을때는 화면에 따라 동적으로 크기가 커지는 `static`이 기본값이다.

다음은 `layout` 속성의 정리이다.

- intrinsic : `layout-shift`현상이 발생하지 않고, `StaticImage` 타입을 전달 하였을 때 부모의 크기에 따라 이미지가 비율에 맞춰 렌더링된다.
- fixed : 고정된 크기로 렌더링 하고 싶을 때 사용한다. `layout-shift`가 발생한다.
- responsive : 화면 크기에 맞춰 이미지가 렌더링 된다.
- fill : 외부 이미지처럼 크기를 모를때 사용한다.
