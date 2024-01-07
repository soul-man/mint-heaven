import { baseNFTs } from '@/constant/nfts/baseNFTs';
import { lineaNFTs } from '@/constant/nfts/lineaNFTs';

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
    name: 'Linea (soon)',
    image: '/images/Linea.png',
    nfts: lineaNFTs,
    status: 'upcoming',
  },
  {
    id: 2,
    name: 'zkSync (soon)',
    image: '/images/zkSync.png',
    nfts: [],
    status: 'upcoming',
  },
  // {
  //   id: 3,
  //   name: 'Scroll (soon)',
  //   image: '/images/Scroll.png',
  //    nfts: [],
  //   status: 'upcoming',
  // },
  {
    id: 4,
    name: 'Polygon ZkEVM (soon)',
    image: '/images/Polygon_zkEVM.png',
    nfts: [],
    status: 'upcoming',
  },
  {
    id: 5,
    name: 'Manta (soon)',
    image: '/images/Manta.png',
    nfts: [],
    status: 'upcoming',
  },
];
