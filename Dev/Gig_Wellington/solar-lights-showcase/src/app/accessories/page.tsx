'use client';

import Header from '@/components/Header';
import { useState, useEffect } from 'react';
import { supabase, type Product } from '@/lib/supabase';
import { MessageCircle, X } from 'lucide-react';
import Image from 'next/image';

type PageContent = {
  [key: string]: string;
};

export default function Accessories() {
  const [products, setProducts] = useState<Product[]>([]);
  const [pageContent, setPageContent] = useState<PageContent>({});
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const [productsRes, contentRes] = await Promise.all([
        supabase.from('products').select('*').order('id', { ascending: true }),
        supabase.from('page_content').select('*').eq('page_name', 'accessories')
      ]);

      if (productsRes.data) setProducts(productsRes.data);
      
      // Convert page content array to object
      if (contentRes.data) {
        const contentObj: PageContent = {};
        contentRes.data.forEach(item => {
          contentObj[`${item.section_name}_${item.content_key}`] = item.content_value;
        });
        setPageContent(contentObj);
      }
    } catch (error) {
      console.error('Error fetching content:', error);
    } finally {
      setLoading(false);
    }
  };

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
      <div className="min-h-screen bg-white">
        <Header />
        <main className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-gray-600">Loading products...</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-white">
        <Header />
        <main className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">
              {pageContent.hero_title || 'All Products & Accessories'}
            </h1>
            <p className="text-lg text-gray-600 mb-12">
              {pageContent.hero_description || 'Explore our complete range of solar lighting solutions and accessories.'}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <div 
                  key={product.id} 
                  onClick={() => openModal(product)}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all cursor-pointer transform hover:scale-105"
                >
                  <div className="relative aspect-square">
                    <Image
                      src={product.image_url}
                      alt={product.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <span className="inline-block text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded mb-2">
                      {product.category}
                    </span>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{product.name}</h3>
                    <p className="text-gray-600 line-clamp-2">{product.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>

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
                  sizes="(max-width: 1200px) 100vw, 1200px"
                  className="object-contain"
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
