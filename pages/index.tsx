import * as React from 'react';
import Intro from '@/components/LandingPage/Intro';
import Chains from '@/components/LandingPage/Chains';
import FaqSection from '@/components/_sections/FaqSection';
import Audit from '@/components/LandingPage/Audit';
import LatestMints from '@/components/LandingPage/LatestMints';
import MintEnhanced from '@/components/LandingPage/MintEnhanced';
import MintingProcess from '@/components/LandingPage/MintingProcess';
import TopChains from '@/components/LandingPage/TopChains';
import Layout from '@/components/layout';

export default function HomePage1() {
  return (
    <Layout>
      <Intro />
      <div className="pb-44">
        <Chains />
      </div>
      <div className="pb-10 md:pb-20 pt-5">
        <MintEnhanced />
      </div>
      <div className="pb-10 pt-32 mx-auto">
        <MintingProcess />
      </div>
      <div className="pb-10 pt-10 mx-auto">
        <LatestMints />
      </div>
      <div className="pb-44">
        <TopChains />
      </div>
      <div className="pb-20 pt-5 px-5 md:px-10 xl:px-0">
        <FaqSection />
      </div>
      <div className="pb-20 pt-5 px-5 md:px-10 xl:px-0">
        <Audit />
      </div>
    </Layout>
  );
}
