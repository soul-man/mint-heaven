import dynamic from 'next/dynamic';
import * as React from 'react';


// import IntroSection from '@/components/_sections/IntroSection';
const IntroSection = dynamic(() => import('@/components/_sections/IntroSection'), { ssr: false });
import FaqSection from '@/components/_sections/FaqSection';
import WelcomeSection from '@/components/_sections/WelcomeSection';
import Layout from '@/components/layout';

export default function HomePage1() {
  return (
    <Layout>
      <WelcomeSection />
      <IntroSection />
      {/* <FaqSection /> */}
    </Layout>
  );
}
