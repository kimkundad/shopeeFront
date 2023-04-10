import React, { Fragment } from 'react'
import "@/styles/globals.css";
import { ChakraProvider, position } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import Layout from "@/components/layouts/layout";
import { Provider } from 'react-redux';
import { store, persistor } from '@/store/config';
import { PersistGate } from 'redux-persist/integration/react'

function App({ Component, pageProps }: AppProps) {
  return (
    <Fragment>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <ChakraProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </PersistGate>
    </Provider>
    </Fragment>
  );
}

export default App;
