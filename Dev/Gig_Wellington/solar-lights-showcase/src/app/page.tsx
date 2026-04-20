import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import BannerSection from '@/components/BannerSection';
import ProductGrid from '@/components/ProductGrid';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <BannerSection />
      <ProductGrid />
    </div>
  );
}
