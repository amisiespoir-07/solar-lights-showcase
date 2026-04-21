import Header from '@/components/Header';
import SimpleHero from '@/components/SimpleHero';
import ProductShowcase from '@/components/ProductShowcase';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <SimpleHero />
      <ProductShowcase />
    </div>
  );
}
