import { connectDB } from "@/util/database";

interface LayoutProps {
  Component: any;
  pageProps: any;
  store: any;
}

export default async function Home({
  Component,
  pageProps,
  store,
}: LayoutProps) {
  const db = (await connectDB).db("onehour");
  let result = await db.collection("userAccount").find().toArray();
  // console.log(entities);

  return <div>{result[0].name}</div>;
}
