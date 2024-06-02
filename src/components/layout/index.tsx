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
    <div className='overflow-hidden min-h-screen grad w-screen bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-blue-900/20 from-10% via-blue-800/30 via-70% to-red-400/10 to-90%'>
      <Seo />
      <Header />
        <main>{children}</main>
      <Footer/>
      <Analytics/>
    </div>
  );
}
