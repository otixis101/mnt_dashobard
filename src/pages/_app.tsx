import type { AppProps } from "next/app";

import { SessionProvider } from "next-auth/react";
import { SWRConfig } from "swr";
import { ToastContainer } from "react-toastify";

import { apiFetcher } from "@/base/utils";

import "@/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";

const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => (
  <SessionProvider session={session}>
    <SWRConfig
      value={{
        fetcher: apiFetcher,
        revalidateOnFocus: false,
        shouldRetryOnError: false,
      }}
    >
      <Component {...pageProps} />
      <ToastContainer />
    </SWRConfig>
  </SessionProvider>
);

export default App;
