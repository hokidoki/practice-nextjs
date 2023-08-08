import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

export default function RedirectComponent({ path }: { path: string }) {
  const router = useRouter();
  useEffect(() => {
    router.push(path);
  }, []);
  return <></>;
}
