import { ConnectWallet } from '@thirdweb-dev/react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { FaEthereum } from "react-icons/fa";
import { Tooltip } from 'react-tippy';
import { ethMarketPriceTest } from '@/utils/ethMarketPrice';

export default function Header() {

  const [mobileOpen, setMobileOpen] = useState(false);
  const [ethMarketPrice, setEthMarketPrice] = useState(0);

  const fetchData = async () => {
    try {
      const price = await ethMarketPriceTest();
      setEthMarketPrice(price);
    } catch (error) {
      console.log('Error:' + error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (

    <nav className="min-[320px]:px-4 xl:px-0 backdrop-blur fixed w-full z-50">
      <div className="max-w-7xl flex flex-wrap items-center justify-between mx-auto py-3 md:py-5 z-11">
        <a href="./" className="flex flex-row items-center space-x-3 z-11">
          <Image 
            src="/images/mint-heaven-logo-small.png" 
            alt="MintHeaven Logo" 
            width={38}
            height={29}
            className="text-xl text-blue-500" 
          />
          <span className="text-2xl lg:text-3xl font-semibold text-white">Mint Heaven</span>
        </a>

        <div className="flex z-10">
          <div className="items-center justify-between hidden w-full md:flex md:w-auto">
            <ul className="flex flex-col p-4 md:p-0 mt-4 bg-transparent md:space-x-2 lg:space-x-8 md:flex-row md:mt-0 md:border-0">
              <li className="flex align-center">
                <a href='./mint-nfts' target="_self" className="font-thin py-2 px-3 md:p-0 text-md lg:text-lg text-white hover:text-blue-400 active:text-blue-500 bg-transparent" >
                  MINT
                </a>
              </li>
              <li className="flex align-center">
                <a href='./create-your-own-nft' target="_self" className="font-thin py-2 px-3 md:p-0 text-md lg:text-lg text-white hover:text-blue-400 active:text-blue-500 bg-transparent" >
                  CREATE
                </a>
              </li>
              <li className="flex align-center">
                <a href='./deploy-smart-contract' target="_self" className="font-thin py-2 px-3 md:p-0 text-md lg:text-lg text-white hover:text-blue-400 active:text-blue-500 bg-transparent" >
                  DEPLOY
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-row items-center gap-5">

          

            <Tooltip
              html={<span className="text-md font-medium">Ethereum market price</span>}
              position="top"
              trigger="mouseenter"
            >
              <div className="hidden md:flex flex-row items-center gap-2 py-1.5">
              <div className="items-center justify-between">
                <FaEthereum className="w-8 h-8 text-blue-400 bg-black/30 rounded-full p-1.5" />
              </div>
              <div className="items-center justify-between text-gray-300 text-md">
                {ethMarketPrice} $
              </div>
              </div>
            </Tooltip>


          
          
          <div className="flex z-10">
            <div className="items-center justify-between hidden w-full md:flex md:w-auto" id="navbar-cta">
              <ConnectWallet theme='dark' />
            </div>
            <div className="flex space-x-3 md:space-x-0">
                <button 
                  onClick={() => setMobileOpen(prevMobileOpen => !prevMobileOpen)} 
                  type="button" 
                  className="
                    inline-flex 
                    items-center 
                    p-2 
                    w-10 
                    h-10 
                    justify-center 
                    text-sm 
                    text-white 
                    rounded-lg 
                    md:hidden 
                    hover:bg-blue-700/20 
                    focus:outline-none 
                    focus:ring-1 
                    focus:ring-blue-400" 
                  >
                  <span className="sr-only">Open main menu</span>
                  <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
                  </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="flex items-center justify-center md:hidden w-full text-center min-h-[calc(100vh-80px)]">
            <ul className="font-medium ">
              <li className="h-12">
                <a href='./mint-nfts' target="_self" className="pb-5 md:p-0 text-2xl text-white hover:text-blue-400 active:text-blue-500 bg-transparent" >
                  Mint
                </a>
              </li>
              <li className="h-12">
                <a href='./create-your-own-nft' target="_self" className="md:p-0 text-2xl text-blue-100 hover:text-blue-400 active:text-blue-500 bg-transparent" >
                  Create
                </a>
              </li>
              <li className="h-12">
                <a href='./deploy-smart-contract' target="_self" className="md:p-0 text-2xl text-blue-100 hover:text-blue-400 active:text-blue-500 bg-transparent" >
                  Deploy
                </a>
              </li>
              <li className="flex justify-center mt-4 text-center">
                <div className="flex flex-row items-center justify-center gap-2 bg-blue-900/30 rounded-lg py-1.5 px-2">
                  <div className="items-center justify-between">
                    <FaEthereum className="w-7 h-7 text-blue-400 bg-black rounded-full p-1.5" />
                  </div>
                  <div className="items-center justify-between text-gray-300">
                    {ethMarketPrice} $
                  </div>
                </div>
              </li>
              <li className="mt-4">
                <ConnectWallet theme='dark' />
              </li>
            </ul>          
        </div>
      )}



    </nav>
  );
}
