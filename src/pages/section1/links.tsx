import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Links() {
  const router = useRouter();
  const go = "/section1/getStaticProps";

  useEffect(() => {
    router.prefetch(go);
    console.log("???");
  }, [router]);

  return (
    <main>
      <h1>Links</h1>
      {/* <div style={{ height: "200vh" }} /> */}
      <button onClick={() => router.push(go)}>GetStaticProps</button>
    </main>
  );
}
