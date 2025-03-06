import { Chain } from '@/constant/models/chain';
import { baseNFTs } from '@/constant/nfts/baseNFTs';
import { blastNFTs } from '@/constant/nfts/blastNFTs';
import { scrollNFTs } from '@/constant/nfts/scrollNFTs';

export const chains: Chain[] = [
  {
    id: 0,
    name: 'Base',
    slug: 'base',
    chainId: 8453,
    chain: 'base',
    image: '/images/Base_color.png',
    nfts: baseNFTs,
    status: 'live',
    currency: "ETH",
    mainnet: true,
  },
  {
    id: 1,
    name: 'Scroll',
    slug: 'scroll',
    chainId: 534352,
    chain: 'scroll',
    image: '/images/Scroll_color.png',
    nfts: scrollNFTs,
    status: 'done',
    currency: "ETH",
    mainnet: true,
  },
  {
    id: 2,
    name: 'Blast',
    slug: 'blast-blastmainnet',
    chainId: 81457,
    chain: 'blast',
    image: '/images/blast_color.png',
    nfts: blastNFTs,
    status: 'done',
    currency: "ETH",
    mainnet: true,
  }
];
