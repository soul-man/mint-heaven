export interface mintingProps {
  address: any;
  ethMarketPrice: number;
  currency: string;
  mainnet: boolean;
  slug: string;
  notifyMinting(a: string, b: string, c: string): any;
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
  chain: any;
}
