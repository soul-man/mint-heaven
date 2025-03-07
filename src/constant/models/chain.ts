export interface Chain {
  id: number;
  name: string;
  slug: string;
  chainId: number,
  chain: any,
  image: string;
  nfts: any[];
  status: 'live' | 'disabled' | 'done';
  currency: string;
  mainnet: boolean;
}
