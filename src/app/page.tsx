import Hero from '@/components/common/Hero';
import HomeLeft from '@/components/common/HomeLeft';
import HomeMiddle from '@/components/common/Homemiddle';
import HomeRight from '@/components/common/HomeRight';
import MarqueeComponent from '@/components/common/Marquee';
import Footer from '@/components/Layout/Footer';
import Navbar from '@/components/Layout/Navbar';

export const metadata = {
  title: 'NHAASCPL Tender Portal | Home',
  description:
    'Apply for government tenders, manage bids, and track applications on BidSmartAi.',
  openGraph: {
    title: 'NHAASCPL Tender Portal',
    description: 'Apply for government tenders online.',
    type: 'website',
  },
};

// ✅ No 'use client' — fully server rendered
export default function Home() {
  return (
    <div className="bg-gray-100">
      <Navbar />
      <Hero />
      <MarqueeComponent />
      <main className="w-full py-4">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr_260px] gap-3">
            <HomeLeft />
            <HomeMiddle />
            <HomeRight />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}