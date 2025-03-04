import { NextUIProvider } from "@nextui-org/react";
import { ThirdwebProvider } from 'thirdweb/react';
import { AppProps } from 'next/app';
import { useState } from "react";
import ChainContext from "@/lib/context/Chain";

import '@/styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';
import "react-tippy/dist/tippy.css";

function MyApp({ Component, pageProps }: AppProps) {
  const [selectedChain, setSelectedChain] = useState("scroll");
  return (
    <NextUIProvider>
      <ChainContext.Provider value={{ selectedChain, setSelectedChain }}>
        <ThirdwebProvider>
          <Component {...pageProps} />
        </ThirdwebProvider>
      </ChainContext.Provider>
    </NextUIProvider>
  );
}

export default MyApp;
