interface Chains {
  id: number;
  name: string;
  slug: string;
  chainId: number,
  image: string;
  currency: string;
  mainnet: boolean;
}

export const chains: Chains[] = [
  {
    id: 0,
    name: 'Base',
    slug: 'base',
    chainId: 8453,
    image: '/images/Base_color.png',
    currency: "ETH",
    mainnet: true
  }
];
