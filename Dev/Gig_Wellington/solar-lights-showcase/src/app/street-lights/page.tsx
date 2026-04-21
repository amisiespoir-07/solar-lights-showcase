import Header from '@/components/Header';
import ProductGrid from '@/components/ProductGrid';

export default function StreetLights() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Street Lights</h1>
          <p className="text-lg text-gray-600 mb-12">
            High-quality solar street lights for all your outdoor lighting needs. 
            Energy-efficient, durable, and environmentally friendly solutions.
          </p>
          <ProductGrid />
        </div>
      </main>
    </div>
  );
}
