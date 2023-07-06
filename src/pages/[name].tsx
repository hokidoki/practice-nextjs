import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import type { Store } from "../types/store";

interface Props {
  store: Store;
}

const StoreDetail: NextPage<Props> = ({ store }) => {
  return <div>name: {store.name}</div>;
};
export default StoreDetail;

/** https://nextjs.org/docs/basic-features/data-fetching/get-static-paths */
export const getStaticPaths: GetStaticPaths = async () => {
  const stores = (await import("../../public/stores.json")).default;
  const paths = stores.map((store) => ({ params: { name: store.name } }));

  return { paths, fallback: "blocking" };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const stores = (await import("../../public/stores.json")).default;
  const store = stores.find((store) => store.name === params?.name);

  if (!store) return { notFound: true };

  return { props: { store } };
};
