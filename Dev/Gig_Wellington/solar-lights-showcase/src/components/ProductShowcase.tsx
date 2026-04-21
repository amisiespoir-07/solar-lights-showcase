'use client';

import { Star, MessageCircle } from 'lucide-react';
import { useState } from 'react';

const products = [
  {
    id: 1,
    name: 'Solar Street Light Pro',
    price: '$299.99',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
    category: 'Street Lights',
    rating: 4.5,
    reviews: 12,
    description: 'High-powered LED street light with advanced solar panel'
  },
  {
    id: 2,
    name: 'Compact Solar Lamp',
    price: '$149.99',
    image: 'https://images.unsplash.com/photo-1539683255351-1b4d6d4a9a4c?w=400&h=300&fit=crop',
    category: 'Street Lights',
    rating: 4.8,
    reviews: 8,
    description: 'Perfect for residential areas and pathways'
  },
  {
    id: 3,
    name: 'Solar Panel 200W',
    price: '$189.99',
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&h=300&fit=crop',
    category: 'Accessories',
    rating: 4.7,
    reviews: 15,
    description: 'High-efficiency monocrystalline solar panel'
  },
  {
    id: 4,
    name: 'Lithium Battery Pack',
    price: '$129.99',
    image: 'https://images.unsplash.com/photo-1581094794479-3a6516b91875?w=400&h=300&fit=crop',
    category: 'Accessories',
    rating: 4.6,
    reviews: 10,
    description: 'Long-life energy storage solution'
  },
  {
    id: 5,
    name: 'Solar Garden Light',
    price: '$79.99',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
    category: 'Street Lights',
    rating: 4.4,
    reviews: 6,
    description: 'Decorative lighting for gardens and landscapes'
  },
  {
    id: 6,
    name: 'Smart Controller',
    price: '$89.99',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop',
    category: 'Accessories',
    rating: 4.9,
    reviews: 20,
    description: 'Intelligent charge and discharge management'
  }
];

export default function ProductShowcase() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Street Lights', 'Accessories'];
  
  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  const handleWhatsAppContact = (productName: string) => {
    const message = `Hello, I am interested in the product: ${productName}. Please provide more information.`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
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
            <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="aspect-w-16 aspect-h-12">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded">
                    {product.category}
                  </span>
                  <div className="flex items-center gap-1">
                    <Star size={16} className="text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600">{product.rating}</span>
                    <span className="text-sm text-gray-400">({product.reviews})</span>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <div className="flex items-center justify-between">
                  <p className="text-2xl font-bold text-green-600">{product.price}</p>
                  <button
                    onClick={() => handleWhatsAppContact(product.name)}
                    className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                  >
                    <MessageCircle size={18} />
                    Contact
                  </button>
                </div>
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
  );
}
