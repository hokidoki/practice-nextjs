import React, { useEffect, useState } from "react";
import { delay } from "@/mock";
import dynamic from "next/dynamic";

const NoSSR = dynamic(() => import("@/components/section1/NoSSR"), {
  ssr: false,
});

const a = Promise.resolve("10");
console.log(a);
export default function Example() {
  const [data, setData] = useState(0);

  useEffect(() => {
    const t = 2 * 1000;
    delay(Math.random(), t).then(setData);
    a.then(console.log);
  }, []);

  return (
    <div>
      <h1>getServerSideProps</h1>
      <div>Data :{data}</div>

      <NoSSR />
    </div>
  );
}
