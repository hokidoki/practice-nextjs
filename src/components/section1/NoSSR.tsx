import React from "react";

export default function NoSSR() {
  return <div>{window.innerWidth}</div>;
}
