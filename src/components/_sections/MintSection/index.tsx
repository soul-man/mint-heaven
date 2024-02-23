import { useAddress } from '@thirdweb-dev/react';
import axios from 'axios';
import cache from 'memory-cache';
import Image from 'next/image';
import React from 'react';
import { useContext, useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';

// import { Tooltip } from 'react-tippy';
import ChainContext from "@/lib/context/Chain";

import { chains } from '@/constant/chains';
import { Chain } from "@/constant/models/chain";
import { baseNFTs } from '@/constant/nfts/baseNFTs';

import MintCard from './Card/index';
import { getXataClient } from '../../../xata';
const xata = getXataClient();

export function notify(message: string) {
  toast(message);
}

const MintSection = () => {
  const address: any = useAddress();
  const [ethMarketPrice, setEthMarketPrice] = useState(0);
  const [nfts, setNfts] = useState<any[]>([]);
  const [mints, setMints] = useState<any[]>([]);
  const {selectedChain, setSelectedChain } = useContext(ChainContext);
  const [selectedChainId, setSelectedChainId] = useState<number>(0);
  const [selectedNfts, setSelectedNfts] = useState<any[]>(baseNFTs);
  const [currency, setCurrency] = useState<string>("ETH");
  const [mainnet, setMainnet] = useState<boolean>(true);

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
        setMints(mints);
      }
    } catch (error) {
      console.log('Error:' + error);
    }
  };

  const MintCounter = (slug: any) => {

    // const MintStats = (props: any) => {
    //   return(
    //     <div>
    //       <div>
    //         Minted NFTs: <strong>{props.mintCount}</strong>
    //       </div>
    //       <div>
    //         Unique contracts: <strong>{props.contractCount}</strong>
    //       </div>
    //     </div>
    //  )
    // }

    const mintsByChain: any[] = mints.filter(function (mint) {
      if (mint.chain === slug.chainSlug) {
        return mint;
      }
    });

    const uniqueContractCalls = [...new Map(mintsByChain.map(item =>
      [item.contract, item])).values()];

    const mintCount = mintsByChain.length;
    const contractCount = uniqueContractCalls.length;

    return (
      <>
        <span className="text-blue-200">{mintCount}</span>
        <span className="text-gray-500/60">|</span>
        <span className="text-blue-200">{contractCount}</span>
        {/* <Tooltip
          html={<MintStats mintCount={mintCount} contractCount={contractCount} />}
          arrow="true"
          position="top"
          trigger="mouseenter"
          >
          <IoMdInformationCircleOutline className="text-xl text-gray-500/70" />
        </Tooltip> */}
      </>
    )
  };

  const selectChain = async (
      e:any, 
      id: number, 
      nftList: string[], 
      slug: string, 
      currency: string, 
      mainnet: boolean
    ) => {
      e.preventDefault();
      setSelectedChainId(id);
      setSelectedChain(slug);
      setSelectedNfts(nftList);
      await fetchData(address, nftList);
      setCurrency(currency)
      setMainnet(mainnet);
  }

  useEffect(() => {
      setSelectedChain('base');
      fetchEthMarketPrice();
      fetchData(address, selectedNfts);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setSelectedChainId, address]);

  return (
    <>
      <div className='mt-10 mb-3 flex flex-col sm:flex-row gap-3'>
        {chains.map((chain: Chain) => {
          return (
              <div 
                key={chain.id} 
                className={
                  'shrink-1 grow-1 flex flex-auto items-center justify-between rounded-md px-3 py-2 hover:bg-blue-700/20 cursor-pointer ' +
                  (chain.status === 'live' && selectedChainId === chain.id ? 'border-1 border-dashed border-blue-400/30 bg-blue-800/10' : 'bg-blue-800/10')
                }
                onClick={(e) => selectChain(e, chain.id, chain.nfts, chain.slug, chain.currency, chain.mainnet)}
              >
                <div className='flex items-center gap-2'>
                  <Image
                    src={chain.image}
                    width={20}
                    height={20}
                    alt={chain.name}
                  />
                  <div
                    className={
                      'text-xl font-medium md:text-xl text-center ' +
                      (chain.status === 'disabled' ? 'text-gray-600' : 'text-white')
                    }
                  >
                    {chain.name}
                  </div>
                </div>
                
                <div className="flex flex-row items-center justify-start gap-3">
                  <MintCounter chainSlug={chain.slug}/>
                </div>
              </div>
          )
        })}
      </div>

      <hr className='mb-9 h-px border-0 bg-blue-900/20 dark:bg-gray-800'></hr>

      <div className='xs:grid-cols-1 mb-20 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {nfts.map((nft) => {
          return (
            <MintCard
              key={nft.tokenId}
              data={nft}
              address={address}
              ethMarketPrice={ethMarketPrice}
              currency={currency}
              mainnet={mainnet}
              slug={selectedChain}
              notify={notify}
            />
          );
        })}
      </div>
      <ToastContainer className='toast-message' />
    </>
  );
};

export default MintSection;
