'use client'

import * as React from 'react';
import { useState, useContext, useEffect } from 'react';
import Image from 'next/image';
import Layout from '@/components/layout';
import { MintTabs } from '@/components/_sections/CreateNft/mint-area/MintTabs';
import { AiGenerationSection } from '@/components/_sections/CreateNft/mint-area/AiGenerationSection';
import { UploadSection } from '@/components/_sections/CreateNft/mint-area/UploadSection';
import ChainContext from "@/lib/context/Chain";
import { chains } from '@/components/_sections/CreateNft/config/chains';
import "react-image-crop/dist/ReactCrop.css";
import { Cube } from '@phosphor-icons/react';
import { Lightning, Rocket } from '@phosphor-icons/react';

export default function CreateNFT() {
  // Chain Context
  const { selectedChain, setSelectedChain } = useContext(ChainContext);
  const [selectedChainName, setSelectedChainName] = useState<string>('Base');
  const [selectedChainId, setSelectedChainId] = useState<number>(8453);
  const [currency, setCurrency] = useState<string>("ETH");
  const [mainnet, setMainnet] = useState<boolean>(true);

  // Initialize chain context
  useEffect(() => {
    // Set initial chain to Scroll
    setSelectedChain('base');
  }, [setSelectedChain]);

  // AI Generation State
  const [activeTab, setActiveTab] = useState<'ai' | 'upload'>('ai');
  const [selectedStyle, setSelectedStyle] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("hsl(47, 70%, 60%)");
  const [selectedAspectRatio, setSelectedAspectRatio] = useState<string>("1:1");
  const [selectedLighting, setSelectedLighting] = useState<string>("");
  const [aiPrompt, setAiPrompt] = useState('');

  // Upload State - only keep what's needed at this level
  const [imgSrc, setImgSrc] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [contractToMint, setContractToMint] = useState("0x03cd080A0C48D7820E48525F169B174Bf883BD08");

  const selectChain = (
    e: React.MouseEvent,
    chainId: number,
    slug: string,
    currency: string,
    mainnet: boolean,
    name: string
  ) => {
    e.preventDefault();
    console.log('Selecting chain:', { chainId, slug, name }); // Debug log
    setSelectedChainId(chainId);
    setSelectedChain(slug);
    setSelectedChainName(name);
    setCurrency(currency);
    setMainnet(mainnet);
  };

  const generateFinalPrompt = () => {
    // Your existing generateFinalPrompt logic
  };

  // Modified setActiveTab function to only allow 'ai' tab
  const handleSetActiveTab = (tab: 'ai' | 'upload') => {
    // Only allow setting to 'ai' tab for now
    if (tab === 'ai') {
      setActiveTab('ai');
    }
    // Upload tab is disabled, so we ignore attempts to switch to it
  };

  return (
    <Layout>
      <div className="flex flex-col items-center w-full max-w-[1400px] mx-auto px-4 md:px-6 pb-12 md:pb-24 pt-16 md:pt-24">
        <div className="relative flex flex-col gap-6 md:gap-10 justify-center items-center w-full pt-10 md:pt-20">
          {/* Left Column - Text Content */}
          <div className="flex flex-col items-center">
            <div className="flex flex-col items-center">
              <h2 className="
                text-center 
                text-lg md:text-3xl 
                text-white
                font-thin mb-2 md:-mb-2"
              >
                Create and mint your own NFTs
              </h2>
              <h1 className="
                text-center 
                text-3xl md:text-7xl 
                text-white
                !leading-[1.2] font-bold"
              >
                AI <span className="font-bold bg-gradient-to-r from-red-700 to-blue-700 inline-block text-transparent bg-clip-text">Image generater</span>
              </h1>
            </div>

            {/* Features Section */}
            <div className="flex flex-row md:flex-row gap-4 md:gap-8 mt-5">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-900/20 rounded-xl">
                  <Rocket weight="duotone" className="w-4 h-4 md:w-5 md:h-5 text-blue-400" />
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-xs md:text-lg font-light text-white">
                    Easy Creation Process
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-900/20 rounded-xl">
                  <Lightning weight="duotone" className="w-4 h-4 md:w-5 md:h-5 text-blue-400" />
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-xs md:text-lg font-light text-white">
                    Instant Minting
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-900/20 rounded-xl">
                  <Cube weight="duotone" className="w-4 h-4 md:w-5 md:h-5 text-blue-400" />
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-xs md:text-lg font-light text-white">
                    Multiple Blockchains
                  </h3>
                </div>
              </div>
            </div>

            {/* Chain Selection Section */}
            <div className="mx-auto relative z-10 mt-8 md:mt-10">
              <div className='flex flex-col items-center mb-3 gap-1'>
                <span className="text-white text-base md:text-lg text-center">Select Blockchain</span>
                <div className="flex flex-wrap items-center justify-center gap-2 mb-2 mt-2 px-2">
                  {chains.map((chain) => {
                    return (
                      <div
                        key={chain.slug}
                        className={
                          'cursor-pointer relative flex flex-row p-2 md:p-2.5 text-center items-center justify-center text-white gap-2 rounded-md hover:bg-blue-600/30 ' +
                          (chain.slug === selectedChain
                            ? 'bg-blue-900/30 text-white ring-2 ring-blue-500'
                            : 'bg-black/20 text-blue-300/60 hover:text-blue-300 hover:bg-blue-900/20')
                        }
                        onClick={(e) => selectChain(e, chain.chainId, chain.slug, chain.currency, chain.mainnet, chain.name)}
                      >
                        <Image
                          src={chain.image}
                          width={26}
                          height={26}
                          alt={chain.name}
                          className='w-[24px] h-[24px] md:w-[26px] md:h-[26px]'
                        />
                        <span className="text-lg md:text-xl">{chain.name}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Mint Area */}
          <div className="w-full bg-black/20 z-20 shadow-2xl rounded-lg overflow-hidden">
            <div className='flex flex-col items-center z-20 mx-auto'>
              <div className="relative flex flex-col z-20 w-full border border-blue-900/20 rounded-lg overflow-hidden">
                <MintTabs activeTab={activeTab} setActiveTab={handleSetActiveTab} />
                <div className="w-full z-20 p-4 md:p-8">
                  {activeTab === 'ai' ? (
                    <AiGenerationSection
                      selectedStyle={selectedStyle}
                      setSelectedStyle={setSelectedStyle}
                      selectedColor={selectedColor}
                      setSelectedColor={setSelectedColor}
                      selectedLighting={selectedLighting}
                      setSelectedLighting={setSelectedLighting}
                      aiPrompt={aiPrompt}
                      setAiPrompt={setAiPrompt}
                      generateFinalPrompt={generateFinalPrompt}
                      selectedChainId={selectedChainId}
                    />
                  ) : (
                    <UploadSection
                      isLoading={isLoading}
                      setIsLoading={setIsLoading}
                      imgSrc={imgSrc}
                      setImgSrc={setImgSrc}
                      contractToMint={contractToMint}
                      chainId={selectedChainId}
                    />
                  )}
                </div>

                {/* Background Effects */}
                <div className='absolute w-[300px] h-[300px] md:w-[500px] md:h-[500px] top-[-20%] left-[10vw] translate-x-[25%] rounded-full bg-blue-900 opacity-20 mix-blend-lighten blur-2xl filter z-[1]' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
