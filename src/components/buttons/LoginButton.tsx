import React from 'react';
import { client, mintHeavenAddress, wallets } from "../../constant/constants";
import { ConnectButton } from 'thirdweb/react';
import { base, blast, scroll } from 'thirdweb/chains';

const LoginButton: React.FC = () => {

  return (
    <ConnectButton
      theme="dark"
      client={client}
      chains={[base, scroll, blast]}
      connectButton={{
        label: "Connect Wallet",
      }}
      wallets={wallets}
      supportedNFTs={{
        [base.id]: [
          mintHeavenAddress
        ]
      }}
    />
  );
};

export default LoginButton;