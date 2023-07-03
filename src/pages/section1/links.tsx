import React from "react";
import Link from "next/link";

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
