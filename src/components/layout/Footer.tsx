import Image from 'next/image';
import * as React from 'react';
import { FaRegHeart } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="min-[320px]:px-4 xl:px-0">
      <div className="
        pb-7
        max-w-7xl 
        flex 
        flex-col
        lg:flex-row
        items-center 
        justify-between 
        mx-auto 
        z-1
"
      >
        <a href="./" className="flex flex-row items-center space-x-3 z-10">
            <Image 
              src="/images/mint-heaven-logo-small.png" 
              alt="MintHeaven Logo" 
              width={32}
              height={25}
              className="text-xl text-blue-500" 
            />
            <span className="text-lg font-light text-white">mint-heaven.xyz &copy; {new Date().getFullYear()}</span>
        </a>

        <div className='pt-2 lg:pt-0'>
          {/* <p className="mb-1 text-md text-gray-200/80 text-center md:text-right mt-3 md:pt-0">&copy; {new Date().getFullYear()} - mint-heaven.xyz</p> */}
          <div className="text-blue-300/60">
            <div className="flex flex-col md:flex-row items-center text-center mt-3 md:mt-0 gap-2">
              <span className="text-sm flex items-center justify-center text-blue-300/80">
                made by Soulman & JJ <FaRegHeart className="ml-2 text-red-600 text-xl" />{' '}
              </span>
              <span className="text-sm font-light text-blue-300/50">
                build on{' '}
                <a href='https://nextjs.org/'>Next.js</a>,{' '}
                <a href='https://tailwindcss.com/'>Tailwind</a>,{' '}
                <a href='https://thirdweb.com/'>Thirdweb</a>,{' '}
                <a href='https://ipfs.tech/'>IPFS</a>{' '}
                and{' '}
                <a href='https://vercel.com/'>Vercel</a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>


  );
}
