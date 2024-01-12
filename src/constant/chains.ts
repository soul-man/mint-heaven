import { baseNFTs } from '@/constant/nfts/baseNFTs';
import { lineaNFTs } from '@/constant/nfts/lineaNFTs';
import { scrollNFTs } from '@/constant/nfts/scrollNFTs';

export const chains = [
  {
    id: 0,
    name: 'Base',
    image: '/images/Base.png',
    nfts: baseNFTs,
    status: 'live',
  },
  {
    id: 1,
    name: 'Scroll',
    image: '/images/Scroll.png',
     nfts: scrollNFTs,
    status: 'live',
  },
  {
    id: 2,
    name: 'Linea (soon)',
    image: '/images/Linea.png',
    nfts: lineaNFTs,
    status: 'disabled',
  },
  {
    id: 3,
    name: 'zkSync (soon)',
    image: '/images/zkSync.png',
    nfts: [],
    status: 'disabled',
  },
  // {
  //   id: 4,
  //   name: 'Polygon ZkEVM (soon)',
  //   image: '/images/Polygon_zkEVM.png',
  //   nfts: [],
  //   status: 'disabled',
  // },
  {
    id: 4,
    name: 'Manta (soon)',
    image: '/images/Manta.png',
    nfts: [],
    status: 'disabled',
  },
];
