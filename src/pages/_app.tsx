import type { AppProps } from "next/app";

import { SessionProvider } from "next-auth/react";
import { SWRConfig } from "swr";
import { ToastContainer } from "react-toastify";

import { apiFetcher } from "@/base/utils";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import "@/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";

const pKey = process.env.NEXT_PUBLIC_STRIPE_KEY ?? "";

const stripePromise = loadStripe(pKey);

const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => (
  <SessionProvider session={session}>
    <SWRConfig
      value={{
        fetcher: apiFetcher,
        revalidateOnFocus: false,
        shouldRetryOnError: false,
      }}
    >
      <Elements stripe={stripePromise}>
        <Component {...pageProps} />
      </Elements>
      <ToastContainer />
    </SWRConfig>
  </SessionProvider>
);

export default App;
