import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { SessionProvider } from "next-auth/react";

import Layout from "@/components/Layout";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
 const { session } = pageProps;
 return (
  <QueryClientProvider client={queryClient}>
   <SessionProvider session={session}>
    <Layout>
     <Component {...pageProps} />
    </Layout>
   </SessionProvider>
  </QueryClientProvider>
 );
}
