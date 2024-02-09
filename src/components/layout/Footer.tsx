import Image from 'next/image';
import * as React from 'react';
import { FaRegHeart } from "react-icons/fa6";

import UnderlineLink from '@/components/links/UnderlineLink';

import { siteConfig } from '@/constant/config';

export default function Footer() {
  return (
    <footer className="pb-10 min-[320px]:px-4 xl:px-0">
      <div className="
        max-w-6xl 
        flex 
        flex-col
        md:flex-row
        items-center 
        justify-between 
        mx-auto 
        py-4 
        z-1 
        border-t-1 
        border-blue-500/20"
      >
        <a href="./" className="flex flex-row items-center space-x-3 z-10">
            <Image 
              src="/images/mint-heaven-logo-small.png" 
              alt="MintHeaven Logo" 
              width={48}
              height={40}
              className="text-xl text-blue-500" 
            />
            <span className="text-2xl font-semibold text-white">{siteConfig.title}</span>
        </a>
        <div>
          <p className="mb-1 text-md text-gray-200 text-center md:text-right mt-3 md:pt-0">&copy; {new Date().getFullYear()} - mint-heaven.xyz</p>
          <div className="text-sm text-blue-300/50">
            <div className="flex flex-col md:flex-row text-center mt-3 md:mt-0">
              <span className="flex items-center justify-center">
                made by Soulman & JJ <FaRegHeart className="ml-2 mr-2 text-blue-400" />{' '}
              </span>
              <span>
                build on{' '}
                <UnderlineLink href='https://nextjs.org/'>Next.js</UnderlineLink>,{' '}
                <UnderlineLink href='https://tailwindcss.com/'>Tailwind</UnderlineLink>,{' '}
                <UnderlineLink href='https://thirdweb.com/'>Thirdweb</UnderlineLink>{' '}
                and{' '}
                <UnderlineLink href='https://ipfs.tech/'>IPFS</UnderlineLink>
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>


  );
}
