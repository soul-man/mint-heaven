import { useAddress } from '@thirdweb-dev/react';
import axios from 'axios';
import cache from 'memory-cache';
import Image from 'next/image';
import React from 'react';
import { useEffect, useState } from 'react';

import { chains } from '@/constant/chains';
import { baseNFTs } from '@/constant/nfts/baseNFTs';

import MintCard from './Card/index';
import { getXataClient } from '../../../xata';
const xata = getXataClient();

// interface EnumServiceItem {
//   tokenId: number;
//   name: string;
//   image: string;
//   chain: string;
//   chainId: number;
//   contract: string;
//   price: number;
//   minted: boolean;
//   supply: number;
// }

// type EnumServiceItems = Array<EnumServiceItem>

const MintSection = () => {
  const address: any = useAddress();
  const [ethMarketPrice, setEthMarketPrice] = useState(0);
  const [nfts, setNfts] = useState<any[]>([]);
  let nftList: any[] = [];

  const fetchEthMarketPrice = async () => {
    const urlEthMarketPrice = 'https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD';
    // Get the cached value of ETH market price
    const value = cache.get(urlEthMarketPrice);
    if (value) {
      setEthMarketPrice(value);
    } else {
      const response = await axios.get(urlEthMarketPrice);
      const data = response.data.USD;
      setEthMarketPrice(data);
      cache.put(urlEthMarketPrice, data, 1000 * 0.5 * 60 * 60);
    }
  }

  const fetchData = async (address: string) => {
    try {

      // Set default NFT list
      if (address === undefined) {
        setNfts(baseNFTs);
      }

      // Get all mints by address
      const mints = await xata.db.mints.filter('address', address).getAll();

      // Set minted true if a mint is found
      nftList = baseNFTs.map((nft) => {
        mints.find((mint) => {
          if (
            mint.contract &&
            mint.address &&
            mint.contract.toLowerCase() === nft.contract.toLowerCase() &&
            mint.address.toLowerCase() === address.toLowerCase()
          ) {
            nft.minted = true;
          }
        });
        return nft;
      });

      setNfts(nftList);
    } catch (error) {
      console.log('Error:' + error);
    }
  };

  // const switchChain = async (e:any, nftList: string[]) => {
  //   e.preventDefault();
  //   setNfts(nftList);
  // }

  useEffect(() => {
    (async () => {
      await fetchEthMarketPrice();
      await fetchData(address);
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);

  return (
    <>
      <div className='mb-4 flex flex-wrap gap-2'>
        {chains.map((chain) => {
          return (
            <button
              key={chain.id}
              className={
                'shrink-1 grow-1 flex flex-auto items-center rounded-md px-2 py-1 ring-1 ring-inset ring-gray-500/10 ' +
                (chain.status === 'upcoming' ? 'bg-gray-900' : 'bg-blue-500')
              }
              // onClick={(e) => switchChain(e, chain.nfts)}
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
                  (chain.status === 'upcoming' ? 'text-gray-600' : 'text-white')
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
            <MintCard
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

export default MintSection;
