import * as React from 'react';

import MintSection from '@/components/_sections/MintSection';
import WelcomeSection from '@/components/_sections/WelcomeSection';
import Layout from '@/components/layout';

//This will be the best app ever! I promise! OnChain is the future.
export default function HomePage() {
  return (
    <Layout>
      <WelcomeSection />
      <MintSection />
    </Layout>
  );
}
