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
