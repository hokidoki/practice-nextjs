export default {
    // %s 면 Next-seo에 존재하는 문자열이 들어감
    // 매장 지도 - Next.js 시작하기
    titleTemplate: '%s - Next.js 시작하기',
    openGraph: {
      type: 'website',
      site_name: 'Next.js 시작하기',
      images: [
        { url: 'https://nextjs.org/static/blog/next-13/twitter-card.png' },
      ],
    },
    additionalLinkTags: [
      {
        rel: 'shortcut icon',
        href: '/favicon.ico',
      },
    ],
  };
  