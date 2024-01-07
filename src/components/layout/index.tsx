import { ConnectWallet } from '@thirdweb-dev/react';
import * as React from 'react';

import Seo from '@/components/layout/SEO';
import UnderlineLink from '@/components/links/UnderlineLink';

import { siteConfig } from '@/constant/config';

// import Logo from '~/svg/Logo.svg';
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='grad w-screen bg-gradient-to-b from-slate-900 from-20% to-slate-950 to-90%'>
      <div className='relative w-full max-w-xl'>
        <div className='blob1 animate-blob absolute left-[52vw] top-36 rounded-full bg-blue-400 opacity-10 mix-blend-lighten blur-2xl filter animation-delay-2000'></div>
        <div className='blob2 animate-blob absolute left-40 top-36 rounded-full bg-blue-600 opacity-10 mix-blend-lighten blur-2xl filter animation-delay-4000'></div>
      </div>
      <Seo />
      <div className='relative mx-auto flex max-w-6xl flex-col items-center justify-between min-[320px]:px-4 xl:px-0'>
        <header className='sm:mb-10 mt-5 flex w-full items-center justify-between'>
          <div className='flex items-center'>
            <h1 className='text-xl md:text-3xl text-blue-100'>{siteConfig.title}</h1>
          </div>
          <div className='flex items-center'>
            <ConnectWallet theme='dark' />
          </div>
        </header>
        <main>{children}</main>
        <footer className='text-gray-700'>
          <div className='mb-10'>
            Made by Soulman © {new Date().getFullYear()}, build on{' '}
            <UnderlineLink href='https://nextjs.org/'>Next.js</UnderlineLink>,{' '}
            <UnderlineLink href='https://tailwindcss.com/'>
              Tailwind
            </UnderlineLink>{' '}
            and{' '}
            <UnderlineLink href='https://thirdweb.com/'>Thirdweb</UnderlineLink>
          </div>
        </footer>
      </div>
    </div>
  );
}
