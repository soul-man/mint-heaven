import dynamic from "next/dynamic";
import * as React from 'react';
import { Analytics } from "@vercel/analytics/react";

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
    <div className='overflow-hidden min-h-screen grad w-screen bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-black/10 from-10% via-blue-700/20 via-70% to-red-500/10 to-90%'>

      <Seo />
      <Header />
      <div className='mx-auto flex max-w-7xl flex-col items-center justify-center'>
        <main>{children}</main>
      </div>
      <Footer/>
      <Analytics/>
    </div>
  );
}
