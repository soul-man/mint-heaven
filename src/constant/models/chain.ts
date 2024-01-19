export interface Chain {
  id: number;
  name: string;
  slug: string;
  chainId: number,
  image: string;
  nfts: any[];
  status: 'live' | 'disabled';
}
