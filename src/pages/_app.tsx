import "@/styles/globals.css";
import type { AppProps } from "next/app";
import type { InferGetStaticPropsType, GetStaticProps } from "next";

export default function App({ Component, pageProps }: AppProps) {
 return <Component {...pageProps} />;
}
