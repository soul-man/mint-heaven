import { NextUIProvider } from "@nextui-org/react";
import { Base, BerachainArtio, Scroll } from '@thirdweb-dev/chains';
import { ThirdwebProvider } from '@thirdweb-dev/react';
import { AppProps } from 'next/app';
import { useState } from "react";

import '@/styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';
import "react-tippy/dist/tippy.css";

import ChainContext from "@/lib/context/Chain";

function MyApp({ Component, pageProps }: AppProps) {

const [selectedChain, setSelectedChain] = useState("scroll");

console.log(selectedChain)

  return (
    <NextUIProvider>
      <ChainContext.Provider value={{ selectedChain, setSelectedChain }}>
        <ThirdwebProvider
          supportedChains={[
              Base,
              BerachainArtio,
              Scroll
            ]}
          clientId={process.env.NEXT_THIRDWEB_CLIENT_ID}
          activeChain={selectedChain}
        >
          <Component {...pageProps} />
        </ThirdwebProvider>
      </ChainContext.Provider>
    </NextUIProvider>
  );
}

export default MyApp;
