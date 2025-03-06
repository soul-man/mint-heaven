'use client';

import Image from 'next/image';
import { Tooltip } from 'react-tippy';
import { IoMdInformationCircleOutline } from 'react-icons/io';
import { RiNftLine } from "react-icons/ri";
import { BsArrowRepeat } from "react-icons/bs";
import { IoRocket } from "react-icons/io5";
import { SingleOrbAnimation } from '@/components/ui/background-gradient-animation';
import { SparklesCore } from '@/components/ui/sparkles';
import Cards from '@/components/LandingPage/Cards';

const MintEnhanced = () => {

  return (
    <>
      <div className="mb-1">
        <SingleOrbAnimation
          orbColor="190, 47, 11"
          size="800px"
          orbPosition="bottom-[30%] left-[5%] md:bottom-[20%] md:left-[15%]"
        >
          <div className='mb-10 relative z-40 w-full'>
            <div className='flex flex-col items-center'>
              <div className='flex flex-col max-w-7xl z-40 items-center justify-center'>
                <div className='relative max-w-7xl mx-auto'>
                  <div className="px-3 md:px-10 xl:px-0">
                    <div className='
                      relative flex flex-col xl:flex-row gap-1 md:gap-8 lg:gap-20 items-center lg:items-center justify-center lg:justify-start 
                      border-1  border-blue-900/30
                      text-center xl:text-left
                      bg-black/30
                      rounded-xl
                      border-dashed
                      z-10
                      overflow-hidden 
                      shadow-lg
                      mx-auto'
                    >
                      <div className='p-4 sm:p-8 md:px-4 lg:p-12 w-1/1 md:w-11/12 lg:w-11/12 xl:w-9/12 flex flex-col'>
                        <h2 className="mb-6 flex flex-col flex-wrap text-4xl font-thin md:text-6xl lg:text-7xl xl:text-7xl">
                          Your daily transaction <span className="font-bold bg-gradient-to-r from-red-700 to-blue-600 inline-block text-transparent bg-clip-text"> done in seconds</span>
                        </h2>
                        <p className='mb-12 md:mb-24 lg:mb-10 xl:pr-20 text-blue-300 font-thin text-xl md:text-3xl lg:text-3xl z-10 bg-blend-multiply'>
                          To be eligible for an airdrop, the most important thing is regular interaction with contracts
                        </p>
                        {/* IMAGE: ONLY MOBILE - SM */}
                        <div className='mb-12 md:hidden flex items-center justify-center z-10'>
                          <div className='box rotate-12'>
                            {/* <span></span> */}
                            <Image
                              src="/images/nfts/scroll/scroll-young-outlaws.png"
                              width={400}
                              height={400}
                              alt="scroll-young-outlaws"
                              className="w-[240px] h-[240px]"
                            />
                          </div>
                        </div>

                        <div className="z-10 relative flex flex-row gap-20 lg:gap-32 items-center justify-center xl:justify-start">
                          <div>
                            <p className='text-center md:text-left mb-4 md:mb-4 text-blue-200/60 font-thin text-xl md:text-xl'>
                              Follow our simple steps:
                            </p>
                            <div className="mb-10 flex flex-row md:flex-col xl:flex-row flex-wrap justify-center lg:justify-start gap-3 md:gap-1 lg:gap-2 xl:gap-5">
                              <div className="flex flex-row items-center gap-2 md:gap-4 md:mb-2">
                                <span className="rounded-full bg-blue-600/20 p-2">
                                  <RiNftLine className="text-2xl md:text-4xl text-red-500" />
                                </span>
                                <span className="text-2xl lg:text-3xl font-medium">Mint NFTs</span>
                              </div>
                              <div className="flex flex-row items-center gap-2 md:gap-4 md:mb-2">
                                <span className="rounded-full bg-blue-600/20 p-2">
                                  <BsArrowRepeat className="text-2xl md:text-4xl text-green-500" />
                                </span>
                                <span className="text-2xl lg:text-3xl font-medium">Repeat*</span>
                              </div>
                              <div className="flex flex-row items-center gap-2 md:gap-4 md:mb-2">
                                <span className="rounded-full bg-blue-600/20 p-2">
                                  <IoRocket className="text-2xl md:text-4xl text-blue-500" />
                                </span>
                                <span className="text-2xl lg:text-3xl font-medium">Claim Airdrops</span>
                              </div>
                            </div>

                            <div className="z-30 text-center md:text-left mb-3 relative">
                              <a href="./airdrop-farming-nft-minting">
                                <button className="bg-blue-700 uppercase items-center px-6 md:px-8 py-1.5 md:py-2.5 hover:scale-105 duration-200 text-xl md:text-2xl text-white font-normal rounded-lg relative z-30 pointer-events-auto">
                                  Start farming
                                </button>
                              </a>
                            </div>

                            <div className="flex flex-row gap-2 justify-center md:justify-start items-center">
                              <span className="text-sm md:text-md font-light text-blue-300/30">
                                * daily / weekly / monthly
                              </span>
                              <Tooltip
                                html={<span className="text-md font-medium">Many airdrop farmers fail due to inconsistency. Be active at a regular time!</span>}
                                position="top"
                                trigger="mouseenter"
                              >
                                <IoMdInformationCircleOutline className='w-5 h-5 opacity-30 hover:opacity-90 hover:scale-125 duration-300' />
                              </Tooltip>
                            </div>

                          </div>

                          <div className="hidden md:flex xl:hidden flex-row z-1 lg:pt-10">
                            <div className='box rotate-12'>
                              {/* <span></span> */}
                              <Image
                                src="/images/nfts/scroll/scroll-young-outlaws.png"
                                width={400}
                                height={400}
                                alt="scroll-young-outlaws"
                                className="w-[320px] h-[320px] md:w-[320px] md:h-[320px] lg:w-[360px] lg:h-[360px] xl:w-[400px] xl:h-[400px]"
                              />
                            </div>
                          </div>

                        </div>

                      </div>

                      <div className='
              absolute 
              w-[500px] 
              h-[500px] 
              top-[-20%]
              left-[10vw]
              md:w-[800px] 
              md:h-[600px] 
              md:top-[-12%] 
              md:left-[-12%] 
              rounded-full 
              bg-blue-900 
              opacity-10 
              mix-blend-lighten 
              blur-2xl 
              filter
              z-1'
                      >
                      </div>

                      <div className='
              absolute 
              w-[500px] 
              h-[500px] 
              top-[-20%]
              left-[10vw]
              md:w-[1200px] 
              md:h-[1200px] 
              md:top-[75%] 
              md:left-[-40%] 
              rounded-full 
              bg-blue-700 
              opacity-20 
              mix-blend-lighten 
              blur-2xl 
              filter
              z-1'
                      >
                      </div>

                    </div>

                  </div>

                  <div className="absolute top-[12%] right-[-8%] xl:top-[15%] xl:right-[1%] 2xl:top-[12%] 2xl:right-[-8%] hidden xl:flex flex-row z-10">
                    <div className='box rotate-12 lg:mt-0'>
                      {/* <span></span> */}
                      <Image
                        src="/images/nfts/scroll/scroll-young-outlaws.png"
                        width={400}
                        height={400}
                        alt="scroll-young-outlaws"
                        className="w-[360px] h-[360px] xl:w-[430px] xl:h-[430px] 2xl:w-[460px] 2xl:h-[460px]"
                      />
                    </div>
                  </div>
                </div>
                <div className="w-full h-6 px-10 xl:px-5 relative z-50 pointer-events-auto rounded-full overflow-hidden">
                  {/* Gradients */}
                  <div className="absolute inset-x-10 top-0 bg-gradient-to-r from-transparent via-blue-500 to-transparent h-px w-3/4" />

                  {/* Core component */}
                  <SparklesCore
                    id="mint-sparkles"
                    background="transparent"
                    minSize={0.4}
                    maxSize={1.1}
                    particleDensity={900}
                    className="w-full h-full"
                    particleColor="#FFFFFF"
                    speed={0.5}
                  />

                  {/* Radial Gradient to prevent sharp edges */}
                  <div className="absolute inset-0 w-full h-full [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
                </div>
              </div>
            </div>
          </div>
          <Cards />
        </SingleOrbAnimation>
      </div>
    </>
  );
};

export default MintEnhanced; 