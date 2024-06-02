import Image from 'next/image';
import React from 'react';
import { useEffect, useState } from 'react';

import { AiOutlineBlock } from "react-icons/ai";

import { getXataClient } from '../../xata';
const xata = getXataClient();

const chainInfo: any = {
  'base': [
    'Base', 
    '/images/Base_color.png',
    'https://basescan.org/tx/'
  ],
  'scroll': [
    'Scroll',
    '/images/Scroll_color.png',
    'https://scrollscan.com/tx/'
  ],
  'berachain-artio': [
    'Bera',
    '/images/Bera.png',
    'https://artio.beratrail.io/tx/'
  ],
  'blast-blastmainnet': [
    'Blast',
    '/images/blast_color.png',
    'https://blastscan.io/tx/'
  ]
}

const TopChains = () => {

  const [topChainList, setTopChainList] = useState<any[]>([]);

  const fetchData = async () => {
    try {
      const topChainList: { mintCount: number, chain: string }[] = [];
      const mints = await xata.db.mints.getAll();
      
      const mintsGroupedbyChain: { [key: string]: any[] } = mints
        .reduce<{ [key: string]: any[] }>(function(result, mint) {
          if (mint.chain != null) {
            (result[mint.chain] = result[mint.chain] || []).push(mint);
          }
          return result;
        }, {});

      Object.keys(mintsGroupedbyChain).forEach(function (key: string) {
        topChainList.push({
          mintCount: mintsGroupedbyChain[key].length,
          chain: key,
        });
      });

      topChainList.sort((a, b) => b.mintCount - a.mintCount);
      setTopChainList(topChainList);

    } catch (error) {
      console.log('Error:' + error);
    }
  };

  useEffect(() => {
      fetchData();
  }, []);

  return (
      <div className='flex flex-col mb-5 mx-auto max-w-7xl px-3 md:px-10 xl:px-0'>
        <div className="flex flex-row gap-2 text-white mb-4">
          {/* <AiOutlineBlock className="text-3xl md:text-4xl text-red-500" /> */}
          <h2 className="text-2xl font-medium md:text-3xl text-blue-400/60">
            <span className="font-thin text-white">Top Blockchains</span>
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 p-2 rounded-md border-3 border-dashed border-blue-900/20">
        {/* <div className="w-auto grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 gap-2 p-2 rounded-md border-3 border-dashed border-blue-900/20"> */}
          {topChainList.map((chain, index) => {
            return (
              <div 
                key={index} 
                className='flex flex-row items-center text-white px-3 xl:px-6 py-3 gap-3 md:gap-4 xl:gap-8 rounded-md bg-black/10'
              >
                  <Image
                    src={chainInfo[chain.chain][1]}
                    width="50"
                    height="50"
                    alt={chain.name} 
                    className="w-10 h-10 lg:w-14 lg:h-14"
                  />
                <div className='flex flex-col'>
                  <span className='font-light text-lg xl:text-2xl text-blue-400'>{chainInfo[chain.chain][0]}</span>
                  <span className='font-medium text-2xl md:text-4xl text-white'>{chain.mintCount}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
  );
};

export default TopChains;
