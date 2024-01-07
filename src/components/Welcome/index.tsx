import { useAddress } from '@thirdweb-dev/react';
import axios from 'axios';
import cache from 'memory-cache';
import Image from 'next/image';
import React from 'react';
import { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';

import { baseNFTs, chains } from '@/constant/config';

import Mint from '../Mint/index';
import { getXataClient } from '../../xata';
const xata = getXataClient();

const Welcome = () => {
  const address: any = useAddress();
  const [ethMarketPrice, setEthMarketPrice] = useState(0);
  const [nfts, setNfts] = useState<any[]>([]);
  let nftList: any[] = [];

  const fetchData = async (address: string) => {
    try {
      // Get all mints done by address
      const mints = await xata.db.mints.filter('address', address).getAll();

      // Set minted true if a mint is found
      nftList = baseNFTs.map((nft) => {
        mints.find((mint) => {
          if (
            mint.contract &&
            mint.contract.toLowerCase() === nft.contract.toLowerCase()
          ) {
            nft.minted = true;
          }
        });
        return nft;
      });

      setNfts(nftList);

      const urlEthMarketPrice =
        'https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD';
      // Get the cached value of ETH market price
      const value = cache.get(urlEthMarketPrice);

      if (value) {
        setEthMarketPrice(value);
      } else {
        const response = await axios.get(urlEthMarketPrice);
        const data = response.data.USD;
        setEthMarketPrice(data);
        cache.put(urlEthMarketPrice, data, 1000 * 0.5 * 60 * 60);
        return data;
      }
    } catch (error) {
      console.log('Error:' + error);
    }
  };

  useEffect(() => {
    (async () => {
      await fetchData(address);
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);

  return (
    <>
      <div className='flex h-[90vh] items-center justify-center pb-44 pt-24'>
        <div className='max-w-5xl'>
          <h2
            className={cn(
              'text-lg sm:text-2xl',
              'mb-3 text-center font-semibold uppercase tracking-wider text-white opacity-90'
            )}
          >
            Crypto Airdrops are <span className='underline'>free money</span>
          </h2>
          <div className='mb-16 flex items-center justify-center'>
            <div className='text-md rounded-lg bg-cyan-400 px-3 font-normal tracking-wide text-gray-900 opacity-60 sm:text-lg'>
              All you need is{' '}
              <span className='font-semibold'>contract interaction</span>
            </div>
          </div>

          <h1 className='font-grotesk mb-12 text-center text-5xl text-gray-200 sm:text-7xl'>
            Mint NFTs and <span className='text-blue-400'>grow</span>{' '}
            <span className='text-blue-500'>your</span>{' '}
            <span className='text-blue-600'>footprint</span> for a higher{' '}
            <span className='text-blue-600'>airdrop</span> chance
          </h1>

          <p className='mb-6 px-10 text-center text-xl font-normal tracking-wide text-gray-200 opacity-80 md:px-40 md:text-2xl'>
            <span className='font-gray-100 font-bold'>Boost</span> your contract
            interactions and qualify for the largest airdrops in 2024
          </p>

          <div className='mb-10 flex items-center justify-center gap-5 opacity-90'>
            <Image
              src='/images/Base.png'
              width={30}
              height={30}
              alt='Base L2 Blockchain'
              title='BASE'
            />
            <Image
              src='/images/Linea.png'
              width={30}
              height={30}
              alt='Linea L2 Blockchain'
              title='LINEA'
            />
            <Image
              src='/images/zkSync.png'
              width={30}
              height={15}
              alt='zkSync L2 Blockchain'
              title='zkSync'
            />
            <Image
              src='/images/Manta.png'
              width={30}
              height={15}
              alt='Manta Pacific L2 Blockchain'
              title='MANTA'
            />
            <Image
              src='/images/Polygon_zkEVM.png'
              width={30}
              height={15}
              alt='Polygon zkEVM L2 Blockchain'
              title='POLYGON zkEVM'
            />
            <Image
              src='/images/Scroll.png'
              width={30}
              height={15}
              alt='Scroll L2 Blockchain'
              title='SCROLL'
            />
          </div>

          {/* <div className="text-center mb-6">
            <a className="color_black" href="#mint-nfts">
              <button className=" bg-blue-500 items-center px-4 py-2 hover:bg-blue-600 text-lg text-white font-semibold rounded-md">
                START MINTING NOW
              </button>
            </a>
          </div> */}
        </div>
      </div>

      <div id='mint-nfts' className='mb-4 flex flex-wrap gap-2'>
        {chains.map((chain) => {
          return (
            <button
              key={chain.id}
              className={
                'shrink-1 grow-1 flex flex-auto items-center rounded-md px-2 py-1 ring-1 ring-inset ring-gray-500/10 ' +
                (chain.status === 'upcoming' ? 'bg-gray-900' : 'bg-blue-500')
              }
            >
              <span className='px-2 py-1'>
                <Image
                  src={chain.image}
                  width={25}
                  height={25}
                  alt={chain.name}
                />
              </span>
              <span
                className={
                  'text-xl font-medium md:text-xl lg:text-xl xl:text-2xl ' +
                  (chain.status === 'upcoming' ? 'text-gray-500' : 'text-white')
                }
              >
                {chain.name}
              </span>
            </button>
          );
        })}
      </div>

      <hr className='mb-5 h-px border-0 bg-gray-200 opacity-60 dark:bg-gray-800'></hr>

      <div className='xs:grid-cols-1 mb-20 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {nfts.map((nft) => {
          return (
            <Mint
              key={nft.tokenId}
              data={nft}
              address={address}
              ethMarketPrice={ethMarketPrice}
            />
          );
        })}
      </div>
    </>
  );
};

export default Welcome;
