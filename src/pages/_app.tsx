/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppHeader } from "@/components/AppHeader";
import LoadingModal from "@/components/LoadingModal";
import { AppProvider } from "@/context/appContext";
import { LoadingProvider } from "@/context/loadingContext";
import "@/pages/globals.scss";
import localFont from "next/font/local";
import Head from "next/head";
import { useRouter } from "next/router";
import { ToastContainer } from "react-toastify";
import "../pages/globals.scss";
import RouterLoadingHandler from "./RouterLoadingHandler";

const openSans = localFont({
  src: [
    {
      path: "../assets/fonts/OpenSans-Light.ttf",
      weight: "300",
    },
    {
      path: "../assets/fonts/OpenSans-Regular.ttf",
      weight: "400",
    },
    {
      path: "../assets/fonts/OpenSans-Medium.ttf",
      weight: "500",
    },
    {
      path: "../assets/fonts/OpenSans-SemiBold.ttf",
      weight: "600",
    },
    {
      path: "../assets/fonts/OpenSans-Bold.ttf",
      weight: "700",
    },
    {
      path: "../assets/fonts/OpenSans-ExtraBold.ttf",
      weight: "800",
    },
    {
      path: "../assets/fonts/OpenSans-LightItalic.ttf",
      weight: "300",
      style: "italic",
    },
    {
      path: "../assets/fonts/OpenSans-Italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../assets/fonts/OpenSans-MediumItalic.ttf",
      weight: "500",
      style: "italic",
    },
    {
      path: "../assets/fonts/OpenSans-SemiBoldItalic.ttf",
      weight: "600",
      style: "italic",
    },
    {
      path: "../assets/fonts/OpenSans-BoldItalic.ttf",
      weight: "700",
      style: "italic",
    },
    {
      path: "../assets/fonts/OpenSans-ExtraBoldItalic.ttf",
      weight: "800",
      style: "italic",
    },
  ],
  display: "swap",
});

export default function MyApp({ Component, pageProps }: any) {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Câu lạc bộ giám đốc bệnh viện các tỉnh phía Bắc</title>

        {/* <link rel="icon" href={METADATA_SOURCE.webIcon} />
        <title>
          Robolearn - AI Note Taker and Feynman AI for Intelligent Learning
        </title>
        <meta
          name={METADATA_SOURCE.searchName}
          content={METADATA_SOURCE.searchContent}
        />
        <meta property="og:site_name" content={METADATA_SOURCE.shareName} />
        <meta property="og:title" content={METADATA_SOURCE.shareTitle} />
        <meta
          property="og:description"
          content={METADATA_SOURCE.shareDescription}
        />
        <meta property="og:image" content={METADATA_SOURCE.shareImg} />
        <meta property="og:url" content={METADATA_SOURCE.webURL} />
        <meta name="description" content={METADATA_SOURCE.shareDescription} />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0 maximum-scale=1"
        /> */}
      </Head>
      <div
        className={[
          openSans.className,
          "flex flex-1 flex-col items-center mt-[-1px] h-[100vh] bg-[#fff] overflow-x-hidden scroll-container",
          "RootView",
        ].join(" ")}
      >
        <AppProvider>
          <LoadingProvider>
            {!router?.asPath?.includes("scan") && <AppHeader />}
            <ToastContainer />
            <LoadingModal />
            <RouterLoadingHandler />
            <Component {...pageProps} />
          </LoadingProvider>
        </AppProvider>
      </div>
    </>
  );
}
