import {
  createThirdwebClient,
  getContract,
  sendTransaction
} from "thirdweb";
import Image from 'next/image';
import React, { useContext, useEffect, useState } from 'react';
import { cn } from "@/lib/utils";
import { HiMiniLink } from "react-icons/hi2";
import { TbExternalLink } from "react-icons/tb";
import { toast, ToastContainer } from 'react-toastify';
import basic from 'src/contracts/build/basic.json';
import Web3 from 'web3';
import { SparklesCore } from '@/components/ui/sparkles';
import { useActiveAccount, useActiveWalletChain, useSwitchActiveWalletChain } from 'thirdweb/react';
import { defineChain, type ChainOptions } from "thirdweb/chains";
import { base, scroll, blast, linea } from "thirdweb/chains";

import { getXataClient } from '@/xata';
const xata = getXataClient();

import ChainContext from "@/lib/context/Chain";

// Create a client
const client = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID || "",
});

const chains: any[] = [
  {
    name: 'Base',
    slug: 'base',
    chainId: 8453,
    image: '/images/Base_color.png',
  },
  {
    name: 'Blast',
    slug: 'blast-blastmainnet',
    chainId: 81457,
    image: '/images/blast_color.png',
  },
  {
    name: 'Scroll',
    slug: 'scroll',
    chainId: 534352,
    image: '/images/Scroll_color.png',
  },
  {
    name: 'Bera Chain',
    slug: 'berachain-artio',
    chainId: 80085,
    image: '/images/Bera.png',
  },
  {
    name: 'Linea',
    slug: 'linea',
    chainId: 59144,
    image: '/images/Linea.png',
  },
  {
    name: 'Polygon ZkEVM',
    slug: 'polygon-zkevm',
    chainId: 1101,
    image: '/images/Polygon_zkEVM.png',
  }
];

const explorerLinks: any = {
  'base': 'https://basescan.org/',
  'linea': 'https://lineascan.build/',
  'scroll': 'https://scrollscan.com/',
  'berachain-artio': 'https://artio.beratrail.io/',
  'polygon-zkevm': 'https://zkevm.polygonscan.com/',
  'blast-blastmainnet': 'https://blastscan.io/',
}

// Map chain IDs to chain objects
const chainMap: Record<number, Readonly<ChainOptions & { rpc: string }>> = {
  8453: base,
  59144: linea,
  534352: scroll,
  81457: blast,
  // Add other chains as needed
};

const TokenDeployer = () => {
  const [web3Instance, setWeb3Instance] = useState<Web3>();
  const account = useActiveAccount();
  const chain = useActiveWalletChain();
  const switchChain = useSwitchActiveWalletChain();
  const { selectedChain, setSelectedChain } = useContext(ChainContext);
  const [chainId, setChainId] = useState(8453);
  const [chainName, setChainName] = useState('Base');
  const [deploying, setDeploying] = useState(false);
  const [siteActive, setSiteActive] = useState(false);

  const selectChainToDeploy = async (e: any, slug: any, chainId: number, name: string) => {
    e.preventDefault();
    setSelectedChain(slug);
    setChainId(chainId);
    setChainName(name);
  }

  const handleChainSwitch = async () => {
    const targetChain = chainMap[chainId];
    if (!targetChain) {
      console.error('Unsupported chain ID:', chainId);
      return;
    }
    try {
      await switchChain(targetChain);
    } catch (error) {
      console.error('Failed to switch chain:', error);
    }
  };

  const deployToken = async () => {
    if (!account) {
      throw new Error("No account connected");
    }

    try {
      setDeploying(true);

      setDeploying(false);
    } catch (error) {
      setDeploying(false);
      console.log(error);
    }
  };

  const fifthColor = "34, 47, 168"
  const pointerColor = "190, 47, 11"
  const size = "80%"
  const blendingValue = "hard-light"

  useEffect(() => {
    document.body.style.setProperty("--fifth-color", fifthColor);
    document.body.style.setProperty("--pointer-color", pointerColor);
    document.body.style.setProperty("--size", size);
    document.body.style.setProperty("--blending-value", blendingValue);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && typeof (window as any).ethereum !== 'undefined') {
      const instance = new Web3((window as any).ethereum);
      setWeb3Instance(instance);
    }
    setSelectedChain('base');
  }, [setSelectedChain]);

  // Check if chain is correct
  const isCorrectChain = chain?.id === chainId;

  return (
    <div className="relative z-40 mt-20 px-5 xl:px-0 max-w-7xl mx-auto">

      <div className='flex flex-col items-center justify-center'>
        <div className='flex flex-col md:flex-row xl:p-0 items-center justify-center md:text-left mb-5 md:mb-5 h-[calc(100vh-160px)]'>
          <div className='flex flex-col justify-center md:justify-center items-center md:items-start pl-0 w-1/1 md:w-9/12 lg:w-8/12 xl:pl-0'>

            <div className='mb-8 md:mb-2'>
              <div className='
                  p-1 
                  flex 
                  rounded-lg 
                  bg-blue-600/10 shadow-lg shadow-blue-900/60 border-1 border-blue-500/10
                  px-2 
                  tracking-wide 
                  text-white/80'
              >
                <h3 className="text-sm md:text-lg font-light">Diversify your on-chain footprint</h3>
              </div>
              <div className="w-full h-5 relative">
                {/* Gradients */}
                <div className="absolute inset-x-10 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
                <div className="absolute inset-x-24 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

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
            </div>

            <div>
              <h1 className="mb-7 font-light text-4xl md:text-6xl lg:text-7xl xl:text-7xl text-center md:text-left">
                Deploy your own <span className="font-bold bg-gradient-to-r from-red-700 to-blue-600 inline-block text-transparent bg-clip-text">Smart Contracts</span>
              </h1>
              <h2 className='font-thin text-blue-300 text-xl md:text-3xl lg:text-3xl mb-10 text-center md:text-left'>
                Diversification is one key to Airdrops. Deploy a smart contract once a week.
              </h2>

              {/* Blue Shine */}
              <div
                className={cn(
                  `absolute [background:radial-gradient(circle_at_center,_rgba(var(--fifth-color),_0.8)_0,_rgba(var(--fifth-color),_0)_50%)_no-repeat]`,
                  `[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]`,
                  `top-0 left-0 md:top-[15%] md:left-[45%]`,
                  `w-[40rem] h-[40rem]`,
                  `md:w-[1000px] md:h-[1000px]`,
                  `opacity-60`
                )}
              ></div>
            </div>

            {/* CHAINS BOX */}
            <div className='mb-6 p-3 rounded-md bg-black/20'>
              <div className="flex gap-1 md:gap-2 mb-3">
                {chains.map((chain) => {
                  return (
                    <div
                      key={chain.slug}
                      className={
                        'relative flex flex-row p-2 text-center items-center justify-center text-white gap-1 rounded-md hover:bg-blue-600/30 ' +
                        (chain.slug === selectedChain ? 'bg-blue-600/30 shadow-lg shadow-violet-600/40 border-1 border-violet-500/20' : 'bg-blue-200/10')
                      }
                      onClick={(e) => selectChainToDeploy(e, chain.slug, chain.chainId, chain.name)}
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
              <div className="flex flex-col text-white">
                <span className="text-2xl md:text-2xl font-light">{chainName}</span>
                <div className="group flex flex-row items-center gap-2">
                  {account && (
                    <>
                      <span className="text-blue-400/70 text-sm">
                        <a href={explorerLinks[selectedChain] + 'address/' + account.address} target="_blank" className="hover:underline">Check your Wallet</a>
                      </span>
                      <TbExternalLink className="text-blue-300/90 group-hover:scale-125" />
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* DEPLOY BUTTON */}

            <button
              disabled={siteActive}
              className='bg-blue-700 uppercase min-w-[300px] items-center px-6 md:px-8 py-1.5 md:py-2.5 cursor-not-allowed text-xl md:text-xl text-white font-normal rounded-lg'
            >
              COMING SOON
            </button>

            {siteActive && (
              <div className='flex flex-col justify-center md:justify-start gap-2 mb-2 ml-1'>
                {account && isCorrectChain ? (
                  <button
                    disabled={siteActive}
                    className='bg-blue-700 uppercase items-center px-6 md:px-8 py-1.5 md:py-2.5 hover:scale-105 duration-200 text-xl md:text-xl text-white font-normal rounded-lg'
                    onClick={() => deployToken()}
                  >
                    {deploying ? 'Minting...' : 'DEPLOY CONTRACT'}
                  </button>
                ) : (
                  <>
                    <div className="text-center md:text-left">
                      <button
                        className='bg-red-700 uppercase items-center px-6 md:px-8 py-1.5 md:py-2.5 hover:scale-105 duration-200 text-xl md:text-xl text-white font-normal rounded-lg'
                        onClick={handleChainSwitch}
                      >
                        SWITCH CHAIN
                      </button>
                    </div>
                    <div className='mt-1 text-sm text-red-500'>Wrong network, please switch to <span className='uppercase font-bold'>{selectedChain}</span></div>
                  </>
                )}
              </div>
            )}

          </div>

          {/* ROCKET */}
          <div className="w-1/1 md:w-3/12 lg:w-4/12 hidden md:flex justify-center">
            <div className='relative'>
              <Image
                src="/images/moon2.png"
                width={220}
                height={300}
                alt="Crypto moon rocket"
                className='rounded-md w-[160px] md:w-[260px] xl:w-[260px] z-10'
              />
            </div>
          </div>
        </div>
      </div>

      <ToastContainer
        position="bottom-center"
        autoClose={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        theme="dark"
      />

    </div>
  );
};

export default TokenDeployer;

