import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { MoralisProvider } from "react-moralis";

import { trpc } from "../utils/trpc";
import { ToastContainer } from "react-toastify";
import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <MoralisProvider initializeOnMount={false}>
        <ToastContainer hideProgressBar={true} />
        <Component {...pageProps} />
      </MoralisProvider>
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);
