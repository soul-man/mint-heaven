import { ConnectWallet } from '@thirdweb-dev/react';
import Image from 'next/image';
import { useState } from 'react';

import UnderlineLink from '@/components/links/UnderlineLink';

import { siteConfig } from '@/constant/config';

export default function Header() {

  const [mobileOpen, setMobileOpen] = useState(false);

  return (

    <nav className="min-[320px]:px-4 xl:px-0 backdrop-blur fixed w-full z-20">
      <div className=" max-w-6xl flex flex-wrap items-center justify-between mx-auto py-5 z-11">
        <a href="./" className="flex flex-row items-center space-x-3 z-11">
            <Image 
              src="/images/mint-heaven-logo-small.png" 
              alt="MintHeaven Logo" 
              width={48}
              height={40}
              className="text-xl text-blue-500" 
            />

            <span className="text-2xl font-semibold text-white">{siteConfig.title}</span>
        </a>
        <div className="flex z-10">
          <div className="items-center justify-between hidden w-full md:flex md:w-auto" id="navbar-cta">
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 bg-transparent md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
              <li className="flex align-center">
                <UnderlineLink href='./mint-nfts' target="_self" className="py-2 px-3 md:p-0 text-lg text-white hover:text-blue-400 active:text-blue-500 bg-transparent" >
                  Mint Station
                </UnderlineLink>
              </li>
              <li>
                <ConnectWallet theme='dark' />
              </li>
            </ul>
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

      {mobileOpen && (
        <div className="md:hidden w-full text-center">
          <div className="w-full">
            <ul className="font-medium p-4 md:p-0 mt-1 bg-transparent md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
              <li>
                <UnderlineLink href='./mint-nfts' target="_self" className="my-4 md:p-0 text-lg text-white hover:text-blue-400 active:text-blue-500 bg-transparent" >
                  Mint Station
                </UnderlineLink>
              </li>
              <li>
                <ConnectWallet theme='dark' />
              </li>
            </ul>          
          </div>
        </div>
      )}



    </nav>
  );
}
