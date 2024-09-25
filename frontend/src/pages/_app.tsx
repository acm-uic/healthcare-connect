import "../styles/globals.css";
import Navbar from "../components/Navbar";
import React from "react";
import ReduxProvider from "../components/ReduxProvider";
import { AppProps } from "next/app";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ReduxProvider>
      <Navbar />
      <Component {...pageProps} />
    </ReduxProvider>
  );
};

export default MyApp;
