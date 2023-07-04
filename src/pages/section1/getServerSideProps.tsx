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
