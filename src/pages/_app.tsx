import "@/styles/globals.css";
import type { AppProps } from "next/app";
import type { InferGetStaticPropsType, GetStaticProps } from "next";
import Layout from "@/component/Layout";

export default function App({ Component, pageProps }: AppProps) {
 return (
  <Layout>
   <Component {...pageProps} />
  </Layout>
 );
}
