import React from "react";
import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider } from "@context/AuthProvider";
import DefaultLayout from "../layouts/default";

const MyApp = ({ Component, pageProps }) => {
  const Layout = Component.Layout || DefaultLayout;
  return (
    <AuthProvider>
      <ChakraProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </AuthProvider>
  );
};

export default MyApp;
