import * as React from 'react';

import MintSection from '@/components/_sections/MintSection';
import Layout from '@/components/layout';
import WelcomeSection from '@/components/_sections/WelcomeSection';

export default function HomePage() {
  return (
    <Layout>
      <WelcomeSection />
      <MintSection />
    </Layout>
  );
}
