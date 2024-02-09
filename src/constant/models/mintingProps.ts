export interface mintingProps {
  address: string;
  ethMarketPrice: number;
  currency: string;
  mainnet: boolean;
  slug: string;
  notify(e: string): any;
  data: {
    contract: string;
    name: string;
    image: string;
    chain: string;
    chainId: number;
    price: number;
    supply: number;
    minted: boolean;
  };
}
