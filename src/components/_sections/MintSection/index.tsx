import { useActiveAccount } from "thirdweb/react";
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
import { SparklesCore } from '@/components/ui/sparkles';
import { getXataClient } from '../../../xata';
const xata = getXataClient();

import { HiMiniLink } from "react-icons/hi2";
import { IoMdInformationCircleOutline } from 'react-icons/io';
import { TbExternalLink } from "react-icons/tb";

import TopMinter from '@/components/LandingPage/TopMinter';

export function notifyMinting(messageType: string, link: string, errorDetails = '') {
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
  if (messageType === 'error') {
    if (errorDetails.includes('insufficient funds')) {
      toast.error(
        <>
          <div className='flex flex-col gap-1'>
            <p className='text-left font-bold text-red-500'>Insufficient Funds</p>
            <p className='text-left text-xs text-black/80 mt-1'>
              Please add more funds to your wallet to cover gas fees and the NFT price.
            </p>
          </div>
        </>,
        { autoClose: 8000 }
      );
    } else if (errorDetails.includes('user rejected')) {
      toast.error(
        <>
          <p className='text-left font-bold'>Transaction Cancelled</p>
          <p className='text-left text-sm'>You rejected the transaction</p>
        </>,
        { autoClose: 3000 }
      );
    } else if (errorDetails) {
      toast.error(
        <>
          <div className='flex flex-col gap-1'>
            <p className='text-left font-bold text-red-200'>Transaction Failed</p>
            <p className='text-left text-sm text-red-100 break-words'>
              {errorDetails}
            </p>
          </div>
        </>,
        { autoClose: 5000 }
      );
    } else {
      toast.error(
        <>
          <p className='text-left font-bold'>Transaction Failed</p>
          <p className='text-left text-sm'>Please try again later</p>
        </>,
        { autoClose: 3000 }
      );
    }
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
  const account = useActiveAccount();
  const [ethMarketPrice, setEthMarketPrice] = useState(0);
  const [nfts, setNfts] = useState<any[]>([]);
  const [mints, setMints] = useState<any[]>([]);
  const { selectedChain, setSelectedChain } = useContext(ChainContext);
  const [selectedChainName, setSelectedChainName] = useState<string>('Base');
  const [selectedChainId, setSelectedChainId] = useState<number>(0);
  const [selectedNfts, setSelectedNfts] = useState<any[]>(baseNFTs);
  const [currency, setCurrency] = useState<string>("ETH");
  const [mainnet, setMainnet] = useState<boolean>(true);

  const [chain, setChain] = useState<any>(chains[0]);

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
          mint.address.toLowerCase() === account?.address.toLowerCase()
        ) {
          nft.minted = true;
        }
      });
      return nft;
    });
    setNfts(nftList);
  }

  const fetchData = async (address: any, nfts: any[]) => {
    try {
      // First set the NFTs directly
      setNfts(nfts);
      if (address !== undefined) {
        // Get all mints by address
        const mints = await xata.db.mints.filter('address', account?.address).getAll();
        console.log('mints:', mints)
        addMintedIcon(mints, nfts);
        setMints(mints);
      }
    } catch (error) {
      console.log('Error:' + error);
    }
  };

  const MintCounter = (slug: any) => {

    const MintStats = (props: any) => {
      return (
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
        <span className="text-blue-200 text-md md:text-xl">{mintCount}</span>
        <span className="text-gray-500/60">|</span>
        <span className="text-blue-200 text-md md:text-xl">{contractCount}</span>
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
    e: any,
    id: number,
    nftList: string[],
    slug: string,
    currency: string,
    mainnet: boolean,
    name: string,
    chain: any
  ) => {
    e.preventDefault();
    setSelectedChainId(id);
    setSelectedChain(slug);
    setSelectedChainName(name);
    setSelectedNfts(nftList);
    // Update nfts state directly first
    setNfts(nftList);
    await fetchData(account?.address, nftList);
    setCurrency(currency)
    setMainnet(mainnet);
    setChain(chain);
  }

  useEffect(() => {
    setSelectedChain('base');
    fetchEthMarketPrice();
    fetchData(account?.address, selectedNfts);
    console.log('selectedNfts:', selectedNfts)
    console.log('address:', account?.address)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setSelectedChainId, account?.address]);

  return (
    <div className="px-5 xl:px-0 mt-20 flex flex-col items-center md:items-start max-w-7xl mx-auto">
      <div className='relative flex flex-col md:flex-row xl:p-0 text-center md:text-left md:mt-20 mb-20 md:mb-5'>

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


        <div className='flex flex-col items-center md:items-start pl-0 md:pb-14 w-1/1 md:w-7/12 lg:w-7/12 xl:w-7/12 xl:pl-0'>

          <div className='mb-3 md:mb-2 text-center md:text-left'>
            <div className='
              p-1 
              flex 
              items-center 
              justify-center 
              rounded-lg 
              bg-blue-600/10 shadow-lg shadow-blue-600/25 border-1 border-blue-500/10
              px-2 
              tracking-wide 
              text-white/80
              w-fit
              mx-auto md:mx-0'
            >
              <h3 className="text-sm md:text-lg font-light">Maximize Your <span className="font-bold">Airdrop Potential</span></h3>
            </div>
            <div className="w-full h-5 relative flex justify-center md:justify-start">
              {/* Gradients */}
              <div className="absolute inset-x-10 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4 left-1/2 -translate-x-1/2 md:left-0 md:translate-x-0" />
              <div className="absolute inset-x-24 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4 left-1/2 -translate-x-1/2 md:left-0 md:translate-x-0" />

              {/* Core component */}
              <SparklesCore
                background="transparent"
                minSize={0.4}
                maxSize={1}
                particleDensity={600}
                className="w-full h-full"
                particleColor="#FFFFFF"
              />

              {/* Radial Gradient to prevent sharp edges */}
              <div className="absolute inset-0 w-full h-full [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
            </div>
            {/* <BsRocketTakeoff className="text-xl md:text-6xl text-red-600/70"/> */}
          </div>

          <h1 className="mb-5 md:mb-5 text-4xl md:text-6xl font-light lg:text-7xl xl:text-8xl">
            Unlock Your <span className="font-bold bg-gradient-to-r from-red-700 to-blue-600 inline-block text-transparent bg-clip-text whitespace-nowrap">Airdrop Success</span>
          </h1>
          <p className='mb-5 font-thin text-blue-400 text-xl md:text-2xl lg:text-3xl md:!leading-[2.6rem]'>
            Each NFT is minted through its own unique ERC-721 Smart Contract, creating a distinct on-chain footprint that significantly boosts your eligibility for valuable token airdrops.
          </p>
          <p className='mb-6 text-gray-300/80 font-light md:text-md max-w-2xl'>
            Strategic minting is your gateway to free cryptocurrency rewards. Build a consistent on-chain presence that positions you for the biggest airdrops of 2024 and beyond.
          </p>
        </div>

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

      <div className='flex flex-col mb-16 gap-2'>
        <div className="px-5 py-4 flex flex-row gap-5 bg-black/20 rounded-md">
          <div className="border-r border-white/10 border-dashed pr-5">
            <h3 className="text-md md:text-lg font-normal text-green-400 mb-3 flex gap-1 items-center">
              Ongoing
            </h3>
            <div className="flex gap-1 md:gap-2 mb-3">
              {chains.filter(chain => chain.status === 'live').map((chain) => {
                return (
                  <div
                    key={chain.slug}
                    className={
                      ' cursor-pointer relative flex flex-row p-2 text-center items-center justify-center border border-transparent text-white gap-1 rounded-md hover:bg-green-600/30 ' +
                      (chain.slug === selectedChain ? 'bg-green-600/20 shadow-lg shadow-green-600/50 border-green-500/20' : 'bg-green-200/10')
                    }
                    onClick={(e) => selectChain(e, chain.id, chain.nfts, chain.slug, chain.currency, chain.mainnet, chain.name, chain.chain)}
                  >
                    <Image
                      src={chain.image}
                      width={30}
                      height={30}
                      alt={chain.name}
                      className='w-[30px] h-[30px]'
                    />
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className="text-md md:text-lg font-normal text-red-400 mb-3 flex gap-1 items-center">
              Past Airdrops
            </h3>
            <div className="flex gap-1 md:gap-2 mb-3">
              {chains.filter(chain => chain.status === 'done').map((chain) => {
                return (
                  <div
                    key={chain.slug}
                    className={
                      ' cursor-pointer relative flex flex-row p-2 text-center items-center justify-center border border-transparent text-white gap-1 rounded-md hover:bg-red-600/30 ' +
                      (chain.slug === selectedChain ? 'bg-red-600/30 shadow-lg shadow-red-600/40 border-red-500/20' : 'bg-red-200/10')
                    }
                    onClick={(e) => selectChain(e, chain.id, chain.nfts, chain.slug, chain.currency, chain.mainnet, chain.name, chain.chain)}
                  >
                    <Image
                      src={chain.image}
                      width={30}
                      height={30}
                      alt={chain.name}
                      className='w-[30px] h-[30px]'
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <nav>
          <div className="px-3 py-2 flex flex-row justify-between gap-10 text-white bg-black/20 rounded-md mb-2">
            <div className="text-xl md:text-2xl font-medium tracking-wider">{selectedChainName.toUpperCase()}</div>
            <div className="flex flex-row items-center justify-start gap-2 md:gap-5 z-10">
              <MintCounter chainSlug={selectedChain} />
            </div>
          </div>
          <div className="group flex flex-row items-center gap-2">
            {account?.address && (
              <>
                <span className="pl-3 text-blue-400/70 text-xs md:text-sm">
                  <a href={explorerLinks[selectedChain] + 'address/' + account?.address} target="_blank" className="hover:underline">Check your Wallet</a>
                </span>
                <TbExternalLink className="text-blue-300/90 group-hover:scale-125" />
              </>
            )}
          </div>
        </nav>

      </div>

      <div className='grid-cols-2 mb-20 grid gap-2 md:gap-5 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {nfts.map((nft) => {
          return (
            <MintCard
              key={nft.tokenId}
              data={nft}
              address={account?.address}
              ethMarketPrice={ethMarketPrice}
              currency={currency}
              mainnet={mainnet}
              slug={selectedChain}
              notifyMinting={notifyMinting}
              chain={chain}
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
