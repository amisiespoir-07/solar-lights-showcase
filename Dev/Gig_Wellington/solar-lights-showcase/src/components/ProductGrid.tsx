'use client';

import { Eye, MessageCircle } from 'lucide-react';
import { useState } from 'react';
import ProductModal from './ProductModal';

const products = [
  {
    id: 1,
    name: 'Solar Street Light 60W',
    price: '$289.90',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop'
  },
  {
    id: 2,
    name: 'Solar Street Light 100W',
    price: '$389.90',
    image: 'https://images.unsplash.com/photo-1581094794479-3a6516b91875?w=300&h=300&fit=crop'
  },
  {
    id: 3,
    name: 'Solar Flood Light 50W',
    price: '$189.90',
    image: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=300&h=300&fit=crop'
  },
  {
    id: 4,
    name: 'Smart Solar Light 80W',
    price: '$329.90',
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=300&h=300&fit=crop'
  },
  {
    id: 5,
    name: 'Solar Flood Light 30W',
    price: '$149.90',
    image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=300&h=300&fit=crop'
  },
  {
    id: 6,
    name: 'Solar Street Light 120W',
    price: '$459.90',
    image: 'https://images.unsplash.com/photo-1603792550247-2a9b9a833851?w=300&h=300&fit=crop'
  },
  {
    id: 7,
    name: 'Garden Solar Light 20W',
    price: '$89.90',
    image: 'https://images.unsplash.com/photo-1581094794479-3a6516b91875?w=300&h=300&fit=crop'
  },
  {
    id: 8,
    name: 'Commercial Solar Light 150W',
    price: '$529.90',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=300&fit=crop'
  },
  {
    id: 9,
    name: 'Portable Solar Light 15W',
    price: '$69.90',
    image: 'https://images.unsplash.com/photo-1603792550247-2a9b9a833851?w=300&h=300&fit=crop'
  }
];

export default function ProductGrid() {
  const [selectedProduct, setSelectedProduct] = useState<typeof products[0] | null>(null);

  const handleView = (product: typeof products[0]) => {
    setSelectedProduct(product);
  };

  const handleWhatsApp = (productName: string) => {
    const message = `Hello, I am interested in the product: ${productName}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Products</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-square">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
                <p className="text-2xl font-bold text-green-600 mb-4">{product.price}</p>
                
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
                    Whatsapp
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
