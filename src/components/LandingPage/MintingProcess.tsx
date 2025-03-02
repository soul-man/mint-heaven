"use client";
import React from 'react';
import { SingleOrbAnimation } from '@/components/ui/background-gradient-animation';
import { BsArrowRepeat } from "react-icons/bs";
import { RxRocket } from "react-icons/rx";
import { FaWallet } from "react-icons/fa";
import { PiShareNetwork } from "react-icons/pi";
import { PiMeteorFill } from "react-icons/pi";
import { IoIosRadioButtonOn } from "react-icons/io";
import { Tooltip } from 'react-tippy';
import { IoMdInformationCircleOutline } from 'react-icons/io';
import { IoWarningOutline } from "react-icons/io5";

const MintingProcess = () => {
  return (
    <div className="mb-20">
      <SingleOrbAnimation
        orbColor="15, 55, 211"
        size="1000px"
        orbPosition="top-[20%] right-[5%]"
      >
        <div className='mb-10 relative z-40 w-full'>
          <div className='flex flex-col items-center'>
            <div className='flex flex-col max-w-7xl z-40 items-center justify-center'>
              <div className='relative max-w-7xl mx-auto w-full'>
                <div className="px-4 sm:px-6 md:px-10 xl:px-0">
                  <div className='mb-8 md:mb-20 flex flex-col items-center gap-2'>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl md:!leading-[3.7rem] lg:!leading-[3.4rem] font-thin text-center">
                      <span className="font-extrabold">Airdrop Farming</span> explained
                    </h2>
                    <p className='mt-3 md:mt-4 text-blue-300 font-thin text-xl lg:text-2xl !leading-[2.1rem] text-center max-w-4xl'>
                      Your simple guide to maximizing airdrop opportunities through strategic NFT minting
                    </p>
                  </div>

                  {/* Responsive Bento Grid */}
                  <div className="grid grid-cols-12 gap-4 md:gap-5">

                    {/* What Are Airdrops? - Large */}
                    <div className="col-span-12 md:col-span-8 lg:col-span-8 bg-black/30 border-1 border-blue-900/40 border-dashed rounded-xl p-5 sm:p-5 lg:p-8 hover:bg-black/40 transition-all duration-300">
                      <div className="flex flex-col h-full">
                        <div className="flex flex-row items-center gap-5 mb-4 sm:mb-6">
                          <PiMeteorFill className="text-[6rem] sm:text-3xl md:text-[8rem] xl:text-[6rem] text-yellow-500" />
                          <h3 className="text-3xl md:text-5xl lg:text-5xl font-semibold">What are Airdrops?</h3>
                        </div>
                        <p className="text-blue-300 font-thin text-xl lg:text-2xl !leading-[2.1rem] mb-3 sm:mb-4">
                          Imagine getting free money just for playing with a new toy! Airdrops are like surprise gifts from new blockchain projects. They give away their tokens to early users who tried their network before it became popular.
                        </p>
                        <p className="text-blue-300 font-thin text-xl lg:text-2xl !leading-[2.1rem]">
                          It's like being rewarded for being one of the first customers at a new store - they want to thank you for helping them grow!
                        </p>
                      </div>
                    </div>

                    {/* Connect Your Wallet */}
                    <div className="col-span-12 md:col-span-4 lg:col-span-4 bg-black/20 border-1 border-blue-900/40 border-dashed rounded-xl p-5 sm:p-5 lg:p-8 hover:bg-black/40 transition-all duration-300 overflow-hidden">
                      <div className="relative flex flex-col h-full items-center">
                        <div className="absolute top-0 left-3 right-0 md:left-10 flex items-center justify-center w-full">
                          <div className="flex justify-center items-center">
                            <div className="relative">
                              <FaWallet className="text-[5rem] md:text-[6rem] text-blue-600/10 absolute -left-8 sm:-left-12 md:-left-16" />
                              <FaWallet className="text-[5rem] md:text-[6rem] text-blue-600/30 absolute -left-4 sm:-left-6 md:-left-8" />
                              <FaWallet className="text-[5rem] md:text-[6rem] text-blue-600" />
                            </div>
                          </div>
                        </div>
                        <div className="mt-24 sm:mt-24 md:mt-36">
                          <h3 className="text-2xl font-semibold mb-6 text-center">Connect Your Wallet</h3>
                          <p className="text-blue-300 font-thin text-xl text-center">
                            Your wallet is like your digital backpack. It holds all your blockchain toys (tokens and NFTs). Connect it to start playing!
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Choose Networks */}
                    <div className="relative col-span-12 md:col-span-4 lg:col-span-4 bg-black/20 border-1 border-blue-900/40 border-dashed rounded-xl p-5 sm:p-5 lg:p-8 hover:bg-black/40 transition-all duration-300 overflow-hidden">
                      <div className="absolute bottom-[-2rem] sm:bottom-[-3rem] -right-[3rem] sm:-right-[5rem]">
                        <PiShareNetwork className="text-[12rem] sm:text-[15rem] md:text-[17rem] text-blue-500/30 sm:text-blue-900" />
                      </div>

                      <div className="flex flex-col h-full">
                        <h3 className="text-2xl font-semibold mb-6">Choose Networks</h3>
                        <p className="text-blue-300 font-thin text-xl w-full xl:w-3/4 relative z-10">
                          Different blockchain networks are like different playgrounds. Pick the ones that might give out free tokens later!
                        </p>
                      </div>
                    </div>

                    {/* Mint NFTs Easily */}
                    <div className="col-span-12 md:col-span-8 lg:col-span-8 bg-black/30 border-1 border-blue-900/40 border-dashed rounded-xl p-5 sm:p-5 lg:p-8 hover:bg-black/40 transition-all duration-300">
                      <div className="flex flex-col h-full">
                        <div className="flex flex-row items-center gap-3 sm:gap-5 mb-4 sm:mb-6">
                          <IoIosRadioButtonOn className="text-4xl sm:text-3xl md:text-[7rem] lg:text-[5rem] text-green-400" />
                          <h3 className="text-3xl md:text-5xl lg:text-5xl font-semibold">Mint NFTs Easily</h3>
                        </div>
                        <p className="text-blue-300 font-thin text-xl lg:text-2xl !leading-[2.1rem]">
                          Minting an NFT is like leaving footprints in the sand. It shows blockchain projects you were there and you played with their toys. MintHeaven makes this super easy - just a few clicks and you've created activity that might qualify for future airdrops!
                        </p>
                      </div>
                    </div>

                    {/* Consistency Is Key */}
                    <div className="col-span-12 md:col-span-6 lg:col-span-6 bg-black/30 border-1 border-blue-900/40 border-dashed rounded-xl p-5 sm:p-5 lg:p-8 hover:bg-black/40 transition-all duration-300">
                      <div className="flex flex-col h-full">
                        <div className="flex flex-row items-center gap-3 sm:gap-5 mb-6">
                          <BsArrowRepeat className="text-[6rem] sm:text-3xl md:text-[7rem] text-green-500 md:hidden lg:block" />
                          <h3 className="text-3xl md:text-4xl lg:text-5xl font-semibold">Consistency is Key</h3>
                        </div>
                        <p className="text-blue-300 font-thin text-xl lg:text-2xl !leading-[2.1rem] mb-4">
                          Projects don't just reward one-time visitors. They love to see you come back again and again!
                        </p>
                        <p className="text-blue-300 font-thin text-xl lg:text-2xl !leading-[2.1rem] mb-4">
                          MintHeaven helps you stay consistent by making it easy to mint NFTs regularly - daily, weekly, or monthly.
                        </p>
                        <div className="mt-auto flex items-center gap-2">
                          <span className="text-sm font-light text-blue-300/60">
                            Most airdrop farmers fail due to inconsistency
                          </span>
                          <Tooltip
                            html={<span className="text-sm font-medium">Regular activity patterns are often rewarded more than one-time large transactions!</span>}
                            position="top"
                            trigger="mouseenter"
                          >
                            <IoMdInformationCircleOutline className='w-4 h-4 sm:w-5 sm:h-5 opacity-30 hover:opacity-90 hover:scale-125 duration-300' />
                          </Tooltip>
                        </div>
                      </div>
                    </div>

                    {/* Ready to Start Farming? */}
                    <div className="relative col-span-12 md:col-span-6 lg:col-span-6 bg-black/30 border-1 border-blue-900/40 border-dashed rounded-xl p-5 sm:p-5 lg:p-8 hover:bg-black/40 transition-all duration-300 overflow-hidden">
                      <div className="absolute bottom-[1rem] sm:bottom-[-2rem] right-[1rem] sm:right-[-2rem] md:right-[-1rem] md:bottom-[-1rem] lg:right-[1rem] lg:bottom-[1rem] xl:right-[2rem] xl:bottom-[2rem]">
                        <RxRocket className="text-[7rem] sm:text-[10rem] md:text-[10rem] text-yellow-500" />
                      </div>

                      <div className="flex flex-row items-center gap-3 sm:gap-6 md:gap-10">
                        <div className="relative z-10">
                          <h3 className="text-3xl md:text-5xl lg:text-5xl font-semibold mb-6">Ready to Start Farming?</h3>
                          <p className="text-blue-300 font-thin text-xl lg:text-2xl !leading-[2.1rem] mb-10 w-full lg:w-3/4">
                            MintHeaven makes it simple to mint NFTs across multiple networks and build your airdrop farming strategy
                          </p>
                          <div className="z-30 text-left mb-3 relative">
                            <a href="./mint-nfts">
                              <button className="bg-blue-700 uppercase items-center px-6 md:px-8 py-1.5 md:py-2.5 hover:scale-105 duration-200 text-lg md:text-xl text-white font-normal rounded-lg relative z-30 pointer-events-auto">
                                START FARMING
                              </button>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Risks & Rewards */}
                    <div className="col-span-12 bg-black/50 border-2 border-red-500 rounded-xl p-5 sm:p-5 lg:p-8 hover:bg-black/40 transition-all duration-300 overflow-hidden">
                      <div className="flex flex-col h-full">
                        <div className="flex flex-col md:flex-row md:items-start md:gap-8">
                          <div className="flex items-center gap-3 sm:gap-5 mb-3 sm:mb-4 md:mb-0">
                            <IoWarningOutline className="text-7xl md:text-[4rem] text-red-500" />
                          </div>

                          <div className="flex flex-col md:flex-row gap-7 md:gap-8">
                            <div className="md:flex-1">
                              <h4 className="text-xl font-medium text-white mb-4">Understanding the Risks</h4>
                              <p className="text-blue-300 font-thin text-md md:text-lg mb-2">
                                There's no guarantee that any network will distribute airdrops. All we can do is read the signs and make our own decisions based on network activity and community speculation.
                              </p>
                              <p className="text-blue-300 font-thin text-md md:text-lg italic">
                                This is not financial advice - airdrop farming is an opportunity with both costs and potential rewards. Only invest what you can afford to lose.
                              </p>
                            </div>
                            <div className="md:flex-1">
                              <h4 className="text-xl font-medium text-white mb-4">Time & Money Investment</h4>
                              <p className="text-blue-300 font-thin text-md md:text-lg mb-2">
                                Successful airdrop farming requires consistent activity over time. The best airdrop farmers typically make at least one transaction per week over a period of 6+ months.
                              </p>
                              <p className="text-blue-300 font-thin text-md md:text-lg">
                                You should budget around $100 to cover transaction costs for a 6-month period. This is just an orientation - costs can vary depending on network congestion and the blockchains you choose.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SingleOrbAnimation>
    </div>
  );
};

export default MintingProcess; 