import type { ReactNode } from 'react';
import Layout from '@theme/Layout';
import HomeBanner from '../components/Home/HomeBanner';
import HomeFeatures from '../components/Home/HomeFeatures';
import HomeExtra from '../components/Home/HomeExtra';


export default function Home(): ReactNode {
  return (
    <Layout title={`Home`} description="Clickity-click, it's Sitekick!">
      <HomeBanner />
      <main className="homeBg">
        <HomeFeatures />
        <HomeExtra />
      </main>
    </Layout>
  );
}

//#endregion
