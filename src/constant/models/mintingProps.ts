export interface mintingProps {
  address: string;
  ethMarketPrice: number;
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
