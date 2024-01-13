import { Base, Linea, MantaPacificTestnet, Scroll, ZksyncEra } from '@thirdweb-dev/chains';
import { ThirdwebProvider } from '@thirdweb-dev/react';
import { AppProps } from 'next/app';

import '@/styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider
      supportedChains={[Base, Linea, ZksyncEra, Scroll, MantaPacificTestnet]}
      clientId={process.env.NEXT_THIRDWEB_CLIENT_ID}
    >
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}

export default MyApp;
