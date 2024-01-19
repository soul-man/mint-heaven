import { useAddress } from '@thirdweb-dev/react';
import axios from 'axios';
import cache from 'memory-cache';
import Image from 'next/image';
import React from 'react';
import { useContext, useEffect, useState } from 'react';

import ChainContext from "@/lib/context/Chain";

import { chains } from '@/constant/chains';
import { baseNFTs } from '@/constant/nfts/baseNFTs';

import MintCard from './Card/index';
import { getXataClient } from '../../../xata';
const xata = getXataClient();

const MintSection = () => {
  const address: any = useAddress();
  const [ethMarketPrice, setEthMarketPrice] = useState(0);
  const [nfts, setNfts] = useState<any[]>([]);
  const { selectedChain ,setSelectedChain } = useContext(ChainContext);
  const [selectedChainId, setSelectedChainId] = useState<number>(0);
  const [selectedNfts, setSelectedNfts] = useState<any[]>(baseNFTs);
  
  console.log('selectedChain', selectedChain);

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

  const addMintedIcon = async (mints: any[], nfts: any[]) => {
    // Set minted true if a mint is found
    const nftList: any = nfts.map((nft) => {
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
  }

  const fetchData = async (address: string, nfts: any[]) => {
    try {
      if (address === undefined) {
        setNfts(nfts);
      } else {
        // Get all mints by address
        const mints = await xata.db.mints.filter('address', address).getAll();
        addMintedIcon(mints, nfts)
      }
    } catch (error) {
      console.log('Error:' + error);
    }
  };

  const selectChain = async (e:any, id: number, nftList: string[], slug: string) => {
    e.preventDefault();
    setSelectedChainId(id);
    setSelectedChain(slug);
    setSelectedNfts(nftList);
    await fetchData(address, nftList);
  }

  useEffect(() => {
    fetchEthMarketPrice();
    fetchData(address, selectedNfts);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setSelectedChainId]);

  return (
    <>
      <div className='mb-4 flex flex-wrap gap-2'>
        {chains.map((chain) => {
          return (
            <button
              key={chain.id}
              className={
                'shrink-1 grow-1 flex flex-auto items-center rounded-md px-2 py-1 ring-1 ring-inset ring-gray-500/10 ' +
                (chain.status === 'live' && selectedChainId === chain.id ? 'bg-blue-500' : 'bg-gray-900')
              }
              onClick={(e) => selectChain(e, chain.id, chain.nfts, chain.slug)}
              // style={{
              //   background: selChain === index ? 'lightblue' : 'white'
              // }}
            >
              <span className='pl-2 pr-3 py-1'>
                <Image
                  src={chain.image}
                  width={25}
                  height={25}
                  alt={chain.name}
                />
              </span>
              <span
                className={
                  'text-xl font-medium md:text-xl lg:text-xl xl:text-2xl text-center ' +
                  (chain.status === 'disabled' ? 'text-gray-600' : 'text-white')
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
