import React from 'react';
import { client, mintHeavenAddress, wallets } from "../../constant/constants";
import { ConnectButton } from 'thirdweb/react';
import { base, blast, scroll, baseSepolia } from 'thirdweb/chains';

const LoginButton: React.FC = () => {

  return (
    <ConnectButton
      theme="dark"
      client={client}
      chains={[base, baseSepolia, scroll, blast]}
      connectButton={{
        label: "Connect Wallet",
      }}
      wallets={wallets}
      supportedNFTs={{
        [baseSepolia.id]: [
          mintHeavenAddress
        ]
      }}
    />
  );
};

export default LoginButton;