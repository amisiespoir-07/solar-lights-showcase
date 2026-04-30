'use client';

import { Eye, MessageCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { supabase, type Product } from '@/lib/supabase';
import Image from 'next/image';
import ProductModal from './ProductModal';

export default function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('category', 'Street Lights')
        .order('id', { ascending: true });

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleView = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleWhatsApp = (productName: string) => {
    const message = `Hello, I am interested in the product: ${productName}. Please provide more information.`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Loading products...</p>
      </div>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Products</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative aspect-square">
                <Image
                  src={product.image_url}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
              
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
                
                <div className="flex gap-3">
                  <button
                    onClick={() => handleView(product)}
                    className="flex-1 bg-gray-900 text-white py-2 px-4 rounded hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                  >
                    <Eye size={18} />
                    View
                  </button>
                  <button
                    onClick={() => handleWhatsApp(product.name)}
                    className="flex-1 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
                  >
                    <MessageCircle size={18} />
                    Contact
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Product Modal */}
      <ProductModal 
        product={selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
      />
    </section>
  );
}
