import { Chain } from '@/constant/models/chain';
import { baseNFTs } from '@/constant/nfts/baseNFTs';
import { mantaNFTs } from '@/constant/nfts/mantaNFTs';
import { scrollNFTs } from '@/constant/nfts/scrollNFTs';

export const chains: Chain[] = [
  {
    id: 0,
    name: 'Base',
    slug: 'base',
    chainId: 8453,
    image: '/images/Base.png',
    nfts: baseNFTs,
    status: 'live',
  },
  {
    id: 1,
    name: 'Scroll',
    slug: 'scroll',
    chainId: 534352,
    image: '/images/Scroll.png',
    nfts: scrollNFTs,
    status: 'live',
  },
  {
    id: 2,
    name: 'Manta',
    slug: 'manta-pacific-testnet',
    chainId: 169,
    image: '/images/Manta.png',
    nfts: mantaNFTs,
    status: 'live',
  },
  {
    id: 3,
    name: 'Linea (soon)',
    slug: 'linea',
    chainId: 59144,
    image: '/images/Linea.png',
    nfts: [],
    status: 'disabled',
  },
  {
    id: 4,
    name: 'zkSync (soon)',
    slug: 'zksync',
    chainId: 324,
    image: '/images/zkSync.png',
    nfts: [],
    status: 'disabled',
  },
    // {
  //   id: 4,
  //   name: 'Polygon ZkEVM (soon)',
  //   slug: '',
  //   chainId: 0,
  //   image: '/images/Polygon_zkEVM.png',
  //   nfts: [],
  //   status: 'disabled',
  // },
];
