import Image from 'next/image';
import React from 'react';
import { useEffect, useState } from 'react';

import { getXataClient } from '../../xata';
const xata = getXataClient();

import { baseNFTs } from '@/constant/nfts/baseNFTs';
import { beraNFTs } from '@/constant/nfts/beraNFTs';
import { blastNFTs } from '@/constant/nfts/blastNFTs';
import { scrollNFTs } from '@/constant/nfts/scrollNFTs';

const chainInfo: any = {
  'Base': [
    'Base',
    '/images/Base_color.png',
    'https://basescan.org/tx/'
  ],
  'Scroll': [
    'Scroll',
    '/images/Scroll_color.png',
    'https://scrollscan.com/tx/'
  ],
  'Bera': [
    'Bera Chain',
    '/images/Bera.png',
    'https://artio.beratrail.io/tx/'
  ],
  'Blast': [
    'Blast',
    '/images/blast_color.png',
    'https://blastscan.io/tx/'
  ]
}

const LatestMints = () => {

  const nfts = [
    baseNFTs,
    beraNFTs,
    blastNFTs,
    scrollNFTs
  ];
  const allNFTs = nfts.flat(1);

  const [latestMints, setLatestMints] = useState<any[]>([]);

  const fetchData = async () => {
    try {
      const allMints = await xata.db.mints.sort('id', 'desc').getAll();
      const latestMints = allMints.slice(0, 48);
      const latestMintsList = latestMints.map((item) => {
        const matched = allNFTs.find((nft) => {
          return nft.contract.toLowerCase() === item?.contract?.toLowerCase()
        });
        return matched
      });
      setLatestMints(latestMintsList);
    } catch (error) {
      console.log('Error:' + error);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='mx-auto max-w-7xl px-3 md:px-10 xl:px-0'>
      <div className="flex flex-row items-center gap-2 text-white mb-4">
        {/* <RiNftLine className="text-3xl md:text-4xl text-red-500/90" /> */}
        <h2 className="text-2xl font-medium md:text-3xl text-blue-400/60">
          <span className="font-thin text-white">Latest Mints</span>
        </h2>
      </div>
      <div className="grid grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-2 md:gap-2
        p-2 rounded-md border-3 border-dashed border-blue-900/20">
        {latestMints.map((mint, index) => {
          return (
            <div key={index} className='flex flex-row items-center text-white rounded-md'>
              <div className='relative flex flex-col hover:scale-110 duration-300'>
                <Image
                  src={'/' + mint.image}
                  width={280}
                  height={280}
                  alt={mint.name}
                  className="rounded-md w-full h-full"
                />
                <span className='absolute left-2 bottom-1'>
                  <Image
                    src={chainInfo[mint.chain][1]}
                    width={18}
                    height={18}
                    alt={mint.name}
                  />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LatestMints;
