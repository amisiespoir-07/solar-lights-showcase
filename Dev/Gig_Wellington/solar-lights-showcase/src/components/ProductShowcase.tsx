'use client';

import { MessageCircle, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured, type Product } from '@/lib/supabase';
import Image from 'next/image';

export default function ProductShowcase() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const categories = ['All', 'Street Lights', 'Accessories'];

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      // Check if Supabase is configured
      if (!isSupabaseConfigured) {
        console.warn('Supabase not configured. Please set up your environment variables.');
        setProducts([]);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('id', { ascending: true })
        .limit(30);

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = selectedCategory === 'All'
    ? products
    : products.filter(product => product.category === selectedCategory);

  const handleWhatsAppContact = (productName: string) => {
    const message = `Hello, I am interested in the product: ${productName}. Please provide more information.`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const openModal = (product: Product) => {
    setSelectedProduct(product);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedProduct(null);
    document.body.style.overflow = 'unset';
  };

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-600">Loading products...</p>
        </div>
      </section>
    );
  }

  if (products.length === 0) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Products
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              Explore our range of high-quality solar lighting solutions and accessories
            </p>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 max-w-2xl mx-auto">
              <h3 className="text-lg font-semibold text-yellow-800 mb-2">
                Supabase Configuration Required
              </h3>
              <p className="text-yellow-700 mb-4">
                To display products, please configure your Supabase credentials in the <code className="bg-yellow-100 px-2 py-1 rounded">.env.local</code> file.
              </p>
              <p className="text-sm text-yellow-600">
                See <code className="bg-yellow-100 px-2 py-1 rounded">SUPABASE_SETUP.md</code> for detailed instructions.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Products
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore our range of high-quality solar lighting solutions and accessories
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex rounded-lg border border-gray-200 bg-white p-1">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-green-600 text-white'
                      : 'text-gray-700 hover:text-gray-900'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => openModal(product)}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all cursor-pointer transform hover:scale-105"
              >
                <div className="relative h-64 w-full">
                  <Image
                    src={product.image_url}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded">
                    {product.category}
                  </span>
                  <h3 className="text-xl font-semibold text-gray-900 mt-3 mb-2">{product.name}</h3>
                  <p className="text-gray-600 line-clamp-2">{product.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* View All Button */}
          <div className="text-center mt-12">
            <a
              href="/street-lights"
              className="inline-flex items-center px-8 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
            >
              View All Products
            </a>
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedProduct && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
              >
                <X size={24} className="text-gray-700" />
              </button>
              <div className="relative h-96 w-full">
                <Image
                  src={selectedProduct.image_url}
                  alt={selectedProduct.name}
                  fill
                  className="object-contain"
                  sizes="(max-width: 1200px) 100vw, 1200px"
                />
              </div>
            </div>
            <div className="p-8">
              <span className="text-sm font-medium text-green-600 bg-green-50 px-3 py-1 rounded">
                {selectedProduct.category}
              </span>
              <h2 className="text-3xl font-bold text-gray-900 mt-4 mb-4">
                {selectedProduct.name}
              </h2>
              <p className="text-gray-600 text-lg mb-6">{selectedProduct.description}</p>
              <button
                onClick={() => handleWhatsAppContact(selectedProduct.name)}
                className="flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors text-lg font-semibold"
              >
                <MessageCircle size={20} />
                Contact Us for More Info
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
