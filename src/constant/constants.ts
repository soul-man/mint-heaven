import { createThirdwebClient, getContract } from "thirdweb";
import { base } from "thirdweb/chains";
import { createWallet } from "thirdweb/wallets";

const clientId = process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID;

if (!clientId) {
	throw new Error("No client ID provided");
}

export const chain = base;
export const mintHeavenAddress = "0x7178cD4C2ee9e4B2ed902A013d06Fa064Df9C8e8"; // Base Mainnet

export const client = createThirdwebClient({
	clientId: clientId,
});

export const mintHeavenContract = getContract({
	address: mintHeavenAddress,
	chain,
	client,
});

export const wallets = [
	createWallet("io.metamask"),
	createWallet("com.coinbase.wallet"),
	createWallet("me.rainbow"),
	createWallet("io.rabby"),
	createWallet("io.zerion.wallet"),
	createWallet("walletConnect"),
];
