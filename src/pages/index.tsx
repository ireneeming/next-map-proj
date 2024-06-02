import Map from "@/components/Map";
import Markers from "@/components/Markers";
import StoreBox from "@/components/StoreBox";
import { StoreType } from "@/interface/index";
import { useState } from "react";

import axios from "axios";

export default function Home({ stores }: { stores: StoreType[] }) {
 const [currentStore, setCurrentStore] = useState(null);

 return (
  <>
   <Map />
   <Markers stores={stores} />
   <StoreBox />
  </>
 );
}

// export async function getStaticProps() {
//  const stores = await fetch(
//   `${process.env.NEXT_PUBLIC_API_URL}/api/stores`
//  ).then((res) => res.json());

//  return {
//   props: { stores },
//   revalidate: 60 * 60,
//  };
// }

export async function getStaticProps() {
 const stores = await axios(`${process.env.NEXT_PUBLIC_API_URL}/api/stores`);

 return {
  props: { stores: stores.data },
  revalidate: 60 * 60,
 };
}
