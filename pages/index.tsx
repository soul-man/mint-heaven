import * as React from 'react';

import FaqSection from '@/components/_sections/FaqSection';
import Audit from '@/components/LandingPage/Audit';
import Create from '@/components/LandingPage/Create';
import Deploy from '@/components/LandingPage/Deploy';
import Intro from '@/components/LandingPage/Intro';
import LatestMints from '@/components/LandingPage/LatestMints';
import Mint from '@/components/LandingPage/Mint';
import ProTip from '@/components/LandingPage/ProTip';
import TopChains from '@/components/LandingPage/TopChains';
import Layout from '@/components/layout';
export default function HomePage1() {
  return (
    <Layout>
      <div className="pb-44">
        <Intro />
      </div>
      {/* <div className="pb-44">
        <ProTip />
      </div> */}

      <div className="pb-44 pt-20">
        <Mint />
      </div>

      <div className="pb-10 pt-20">
        <LatestMints />
      </div>

      <div className="pb-44">
        <TopChains />
      </div>


      <div className="flex flex-col sm:flex-row gap-5 xl:gap-8 pt-20 pb-5 xl:pb-8">
        <Deploy />
        <Create />
      </div>

      <div className="pb-20">
        <Audit />
      </div>


      {/* <div className='md:px-6 xl:px-0 flex flex-col md:flex-row gap-5 mt-1 mb-10'>
        <div className="w-12/12 md:w-6/12">
          <TopChains />
        </div>
        <div className="w-12/12 md:w-6/12">
          <LatestMints />
        </div>
      </div> */}

      <FaqSection />



    </Layout>
  );
}
