import React from "react";
import { AppProps } from "next/app";
import ReduxProvider from "../components/ReduxProvider";
import Navbar from "../components/Navbar";
import "../styles/globals.css";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ReduxProvider>
      <Navbar />
      <Component {...pageProps} />
    </ReduxProvider>
  );
};

export default MyApp;
