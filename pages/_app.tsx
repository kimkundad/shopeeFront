import "@/styles/globals.css";
import { ChakraProvider, position } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import Layout from "@/components/layouts/layout";

function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
}

export default App;
