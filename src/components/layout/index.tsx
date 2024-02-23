import dynamic from "next/dynamic";
import * as React from 'react';

import Footer from '@/components/layout/Footer';
// import Header from '@/components/layout/Header';
import Seo from '@/components/layout/SEO';

const Header = dynamic(
  () => {
    return import("@/components/layout/Header");
  },
  { ssr: false }
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    // <div className='min-h-screen grad w-screen bg-gradient-to-b from-slate-900/70 from-10% to-slate-950 to-30%'>
    <div className='min-h-screen grad w-screen bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-slate-900/20 from-10% via-slate-800/20 via-30% to-slate-950 to-90%'>

      <Seo />
      <Header />
      <div className='pt-20 mx-auto flex max-w-6xl flex-col items-center justify-center min-[320px]:px-2 xl:px-0'>
        <main>{children}</main>
      </div>
      <Footer/>
    </div>
  );
}
