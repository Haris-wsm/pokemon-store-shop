import "@/styles/globals.css";
import MainLayout from "@/components/Layouts/MainLayout";

// Carousel
import "react-multi-carousel/lib/styles.css";
import Provider from "@/components/Provider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { SessionProvider } from "next-auth/react";

import { RecoilEnv } from "recoil";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;

  return (
    <Provider>
      <SessionProvider session={session}>
        <MainLayout>
          <Component {...pageProps} />
          <ToastContainer position="bottom-left" />
        </MainLayout>
      </SessionProvider>
    </Provider>
  );
}
