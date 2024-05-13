import { useAddress } from '@thirdweb-dev/react';
import axios from 'axios';
import cache from 'memory-cache';
import Image from 'next/image';
import React from 'react';

import { useContext, useEffect, useState } from 'react';
import { Tooltip } from 'react-tippy';
import { toast, ToastContainer } from 'react-toastify';

import ChainContext from "@/lib/context/Chain";

import { chains } from '@/constant/chains';
import { baseNFTs } from '@/constant/nfts/baseNFTs';

import MintCard from './Card/index';
import { getXataClient } from '../../../xata';
const xata = getXataClient();

import { BsRocketTakeoff } from "react-icons/bs";
import { HiMiniLink } from "react-icons/hi2";
import { IoMdInformationCircleOutline } from 'react-icons/io';
import { TbExternalLink } from "react-icons/tb";

import TopMinter from '@/components/LandingPage/TopMinter';

export function notifyMinting(messageType: string, link: string) {
  if (messageType === 'please-confirm-tx') {
    toast('Please confirm the transaction');
  }
  if (messageType === 'successfully-minted') {
    toast(
      <>
        <p className='text-left font-bold'>NFT successfully minted!</p>
        <div className='flex items-center gap-2 text-left'>
          <a className="text-sm hover:underline" href={link} target='_new'>Open explorer</a>
          <HiMiniLink /> 
        </div>
      </>
    );
  }
};

const explorerLinks: any = {
  'base': 'https://basescan.org/',
  'linea': 'https://lineascan.build/',
  'scroll': 'https://scrollscan.com/',
  'berachain-artio': 'https://artio.beratrail.io/',
  'polygon-zkevm': 'https://zkevm.polygonscan.com/',
  'blast-blastmainnet': 'https://blastscan.io/',
};

const MintSection = () => {
  const address: any = useAddress();
  const [ethMarketPrice, setEthMarketPrice] = useState(0);
  const [nfts, setNfts] = useState<any[]>([]);
  const [mints, setMints] = useState<any[]>([]);
  const {selectedChain, setSelectedChain } = useContext(ChainContext);
  const [selectedChainName, setSelectedChainName] = useState<string>('Base');
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

    const MintStats = (props: any) => {
      return(
        <div>
          <div className="text-xl">
            Minted NFTs: <strong>{props.mintCount}</strong>
          </div>
          <div className="text-xl">
            Unique contracts: <strong>{props.contractCount}</strong>
          </div>
        </div>
     )
    }

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
        <span className="text-blue-200 text-lg md:text-xl">{mintCount}</span>
        <span className="text-gray-500/60">|</span>
        <span className="text-blue-200 text-lg md:text-xl">{contractCount}</span>
        {/* eslint-disable */}
        <Tooltip
          html={<MintStats mintCount={mintCount} contractCount={contractCount} />}
          arrow={true}
          position="top"
          trigger="mouseenter"
          >
            <div>
              <IoMdInformationCircleOutline className="text-xl text-gray-500/70" />
            </div>
        </Tooltip>
      </>
    )
  };

  const selectChain = async (
      e:any, 
      id: number, 
      nftList: string[], 
      slug: string, 
      currency: string, 
      mainnet: boolean,
      name: string
    ) => {
      e.preventDefault();
      setSelectedChainId(id);
      setSelectedChain(slug);
      setSelectedChainName(name);
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
    <div className="mx-5 flex flex-col items-center md:items-start">
      <div className='relative flex flex-col md:flex-row xl:p-0 text-center md:text-left mt-20 mb-20 md:mb-5'>

        <div className='hidden absolute md:top-[15%] md:right-[-10%] lg:top-[10%] lg:right-[-2%] xl:right-[-5%] md:flex gap-5 flex-row w-1/1 md:pr-16 md:w-6/12 lg:w-5/12 xl:w-5/12 items-center justify-center lg:pl-10 z-10 rotate-12'>
          
          <div className="flex flex-col items-end gap-5">
            <div className='transition-all duration-500 hover:scale-105'>
              <Tooltip
                html={<span className="text-xl font-medium">Blast Gunner</span>}
                position="top"
                trigger="mouseenter"
                >
                  <div
                    style={{ backgroundImage: `url(./images/nfts/blast/blast-gunner.png)` }}
                    className='relative rounded-md bg-gray-800 bg-cover bg-center p-4 w-[9rem] h-[9rem] lg:w-[14rem] lg:h-[14rem] xl:w-[15rem] xl:h-[15rem] shadow-lg shadow-blue-600/30 border-1 border-violet-500/20'
                  ></div>
              </Tooltip>
            </div>
            <div className='transition-all duration-500 hover:scale-105'>
              <Tooltip
                html={<span className="text-xl font-medium">Base Party</span>}
                position="top"
                trigger="mouseenter"
                >
                  <div
                    style={{ backgroundImage: `url(./images/nfts/base/base-party.png)` }}
                    className='relative rounded-md bg-gray-800 bg-cover bg-center p-4 w-[7rem] h-[7rem] xl:w-[9rem] xl:h-[9rem] shadow-lg shadow-blue-600/30 border-1 border-violet-500/20'
                  ></div>
              </Tooltip>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <div className='transition-all duration-500 hover:scale-105'>
              <Tooltip
                html={<span className="text-xl font-medium">Bera Party Bear</span>}
                position="top"
                trigger="mouseenter"
                >
                  <div
                    style={{ backgroundImage: `url(./images/nfts/bera/bera-party-bear-nft.png)` }}
                    className='relative rounded-md bg-gray-800 bg-cover bg-center p-4 w-[7rem] h-[7rem] xl:w-[9rem] xl:h-[9rem] shadow-lg shadow-blue-600/30 border-1 border-violet-500/20'
                  ></div>
              </Tooltip>
            </div>
            <div className='transition-all duration-500 hover:scale-105'>
              <Tooltip
                html={<span className="text-xl font-medium">Scroll to the m00n</span>}
                position="top"
                trigger="mouseenter"
                >
                  <div
                    style={{ backgroundImage: `url(./images/nfts/scroll/scroll-to-the-moon.png)` }}
                    className='relative rounded-md bg-gray-800 bg-cover bg-center p-4 w-[9rem] h-[9rem] lg:w-[14rem] lg:h-[14rem] xl:w-[15rem] xl:h-[15rem] shadow-lg shadow-blue-600/30 border-1 border-violet-500/20'
                  ></div>
              </Tooltip>
            </div>

          </div>
        </div>


        <div className='flex flex-col pl-0 md:pb-20 w-1/1 md:w-7/12 lg:w-7/12 xl:w-7/12 xl:pl-0'>

          <div className='mb-8 md:mb-5 flex justify-center md:justify-start items-center gap-10'>
            <div className='
              p-1 
              flex 
              items-center 
              justify-center 
              rounded-lg 
              bg-blue-600/10 shadow-lg shadow-blue-600/25 border-1 border-blue-500/10
              px-2 
              tracking-wide 
              text-gray-300/80'
              >
              <h3 className="text-sm md:text-lg font-light">Earn up to <span className="font-bold">28</span> unique contract calls</h3>
            </div>
            <BsRocketTakeoff className="text-xl md:text-6xl text-red-600/70 hidden"/>
          </div>

          <h1 className="mb-10 text-4xl md:text-6xl font-light lg:text-7xl xl:text-8xl">
            Explore new <span className="font-bold bg-gradient-to-r from-red-700 to-blue-600 inline-block text-transparent bg-clip-text">Opportunities</span>
          </h1>
          <h2 className='mb-3 font-thin text-blue-400 text-xl md:text-2xl lg:text-3xl xl:text-4xl'>
            Each NFT has it's own ERC-721 Contract. This means every mint will earn one unique contract call.
          </h2>
        </div>

        {/* <div className='flex gap-5 flex-row w-1/1 md:pr-16 md:w-6/12 lg:w-5/12 xl:w-5/12 items-center justify-center lg:pl-10 z-10 rotate-12'>
          
          <div className="flex flex-col items-end gap-5">
            <div className='transition-all duration-500 hover:scale-105'>
              <Tooltip
                html={<span className="text-xl font-medium">Base Adventures</span>}
                position="top"
                trigger="mouseenter"
                >
                  <div
                    style={{ backgroundImage: `url(./images/nfts/base/base-adventures.png)` }}
                    className='relative rounded-md bg-gray-800 bg-cover bg-center p-4 w-[9rem] h-[9rem] lg:w-[12rem] lg:h-[12rem] xl:w-[14rem] xl:h-[14rem] shadow-lg shadow-blue-600/30 border-1 border-violet-500/20'
                  ></div>
              </Tooltip>
            </div>
            <div className='transition-all duration-500 hover:scale-105'>
              <Tooltip
                html={<span className="text-xl font-medium">Blast Blaster</span>}
                position="top"
                trigger="mouseenter"
                >
                  <div
                    style={{ backgroundImage: `url(./images/nfts/blast/blast-blaster.png)` }}
                    className='relative rounded-md bg-gray-800 bg-cover bg-center p-4 w-[7rem] h-[7rem] shadow-lg shadow-blue-600/30 border-1 border-violet-500/20'
                  ></div>
              </Tooltip>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <div className='transition-all duration-500 hover:scale-105'>
              <Tooltip
                html={<span className="text-xl font-medium">Bera Party Bear</span>}
                position="top"
                trigger="mouseenter"
                >
                  <div
                    style={{ backgroundImage: `url(./images/nfts/bera/bera-party-bear-nft.png)` }}
                    className='relative rounded-md bg-gray-800 bg-cover bg-center p-4 w-[7rem] h-[7rem] shadow-lg shadow-blue-600/30 border-1 border-violet-500/20'
                  ></div>
              </Tooltip>
            </div>
            <div className='transition-all duration-500 hover:scale-105'>
              <Tooltip
                html={<span className="text-xl font-medium">Scroll Young Outlaws</span>}
                position="top"
                trigger="mouseenter"
                >
                  <div
                    style={{ backgroundImage: `url(./images/nfts/scroll/scroll-young-outlaws.png)` }}
                    className='relative rounded-md bg-gray-800 bg-cover bg-center p-4 w-[9rem] h-[9rem] lg:w-[12rem] lg:h-[12rem] xl:w-[14rem] xl:h-[14rem] shadow-lg shadow-blue-600/30 border-1 border-violet-500/20'
                  ></div>
              </Tooltip>
            </div>

          </div>
        </div> */}
        
        <div className='
          absolute 
          hidden
          md:block
          w-[350px] 
          h-[350px] 
          top-[0%] 
          right-[0%] 
          lg:w-[450px] 
          lg:h-[450px] 
          lg:top-[0%] 
          lg:right-[0%] 
          rounded-full 
          bg-blue-700 
          opacity-10 
          mix-blend-lighten 
          blur-2xl 
          filter'
        >
        </div>

      </div>

      <div className='mb-20 p-3 md:p-5 w-max rounded-md border-3 border-dashed border-blue-900/20'>
        <div className="flex gap-3 mb-5">
          {chains.map((chain) => {
            return (
              <div 
                key={chain.slug} 
                className={
                  ' cursor-pointer relative flex flex-row p-2 text-center items-center justify-center text-white gap-1 rounded-md hover:bg-blue-600/30 ' +
                  (chain.slug === selectedChain ? 'bg-blue-600/30 shadow-lg shadow-violet-600/40 border-1 border-violet-500/20' : 'bg-blue-200/10')
                }
                onClick={(e) => selectChain(e, chain.id, chain.nfts, chain.slug, chain.currency, chain.mainnet, chain.name)}
              >
                <Image
                  src={chain.image}
                  width={40}
                  height={40}
                  alt={chain.name} 
                  className='w-[30px] h-[30px] md:w-[40px] md:h-[40px]'
                />
              </div>
            );
          })}
        </div>

        <nav>
          <div className="flex flex-row gap-10 text-white mb-1">
            <span className="text-2xl md:text-3xl font-medium">{selectedChainName.toUpperCase()}</span>
            <div className="flex flex-row items-center justify-start gap-2 md:gap-5 z-10">
              <MintCounter chainSlug={selectedChain}/>
            </div>
          </div>
          <div className="group flex flex-row items-center gap-2">
            {address && (
              <>
                <span className="text-blue-400/70 text-sm">
                  <a href={explorerLinks[selectedChain] + 'address/' + address} target="_blank" className="hover:underline">Check your Wallet</a>
                </span>
                <TbExternalLink className="text-blue-300/90 group-hover:scale-125" />
              </>
            )}
          </div>
        </nav>

      </div>

      <div className='grid-cols-2 mb-20 grid gap-5 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
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
              notifyMinting={notifyMinting}
            />
          );
        })}
      </div>
      <ToastContainer 
        position="bottom-center"
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        theme="dark"
      />
      
      <TopMinter />

    </div>
  );
};

export default MintSection;
