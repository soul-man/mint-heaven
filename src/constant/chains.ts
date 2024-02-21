import { Chain } from '@/constant/models/chain';
import { baseNFTs } from '@/constant/nfts/baseNFTs';
import { beraNFTs } from '@/constant/nfts/beraNFTs';
import { scrollNFTs } from '@/constant/nfts/scrollNFTs';

export const chains: Chain[] = [
  {
    id: 0,
    name: 'Base',
    slug: 'base',
    chainId: 8453,
    image: '/images/Base_color.png',
    nfts: baseNFTs,
    status: 'live',
    currency: "ETH",
    mainnet: true
  },
  {
    id: 1,
    name: 'Scroll',
    slug: 'scroll',
    chainId: 534352,
    image: '/images/Scroll_colors.png',
    nfts: scrollNFTs,
    status: 'live',
    currency: "ETH",
    mainnet: true
  },
  {
    id: 2,
    name: 'Bera Chain',
    slug: 'berachain-artio',
    chainId: 80085,
    image: '/images/Bera.png',
    nfts: beraNFTs,
    status: 'live',
    currency: "BERA",
    mainnet: false
  },
  // {
  //   id: 3,
  //   name: 'Linea',
  //   slug: 'linea',
  //   chainId: 59144,
  //   image: '/images/Linea.png',
  //   nfts: beraNFTs,
  //   status: 'disabled',
  // },
  // {
  //   id: 4,
  //   name: 'zkSync',
  //   slug: 'zksync',
  //   chainId: 324,
  //   image: '/images/zkSync.png',
  //   nfts: [],
  //   status: 'disabled',
  // },
    // {
  //   id: 4,
  //   name: 'Polygon ZkEVM (soon)',
  //   slug: '',
  //   chainId: 1442,
  //   image: '/images/Polygon_zkEVM.png',
  //   nfts: [],
  //   status: 'disabled',
  // },
];
