import * as React from 'react';

import Audit from '@/components/LandingPage/Audit';
import Create from '@/components/LandingPage/Create';
import Intro from '@/components/LandingPage/Intro';
import Mint from '@/components/LandingPage/Mint';
import Layout from '@/components/layout';

export default function HomePage1() {
  return (
    <Layout>
      <Intro />
      <Audit />
      <Mint />
      <Create />
      {/* <FaqSection /> */}
    </Layout>
  );
}
