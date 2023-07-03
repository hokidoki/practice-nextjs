import React from "react";
import { delay } from "@/mock";

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
