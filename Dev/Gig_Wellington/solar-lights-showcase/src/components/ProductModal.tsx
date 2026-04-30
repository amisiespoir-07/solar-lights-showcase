'use client';

import { X, Star, Check, MessageCircle } from 'lucide-react';
import { useState } from 'react';
import { type Product } from '@/lib/supabase';
import Image from 'next/image';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  if (!product) return null;

  const features = [
    "Auto on/off sensor",
    "10-12 hours of bright LED light",
    "IP65 waterproof for all weather",
    "Remote control included",
    "Easy to install on poles or walls"
  ];

  const additionalOptions = [
    "Extended warranty (2 years)",
    "Professional installation service",
    "Extra remote control",
    "Mounting hardware kit",
    "Weather protection cover"
  ];

  const toggleOption = (option: string) => {
    setSelectedOptions(prev => 
      prev.includes(option) 
        ? prev.filter(item => item !== option)
        : [...prev, option]
    );
  };

  const handleWhatsAppContact = () => {
    let message = `Hello, I am interested in the product: ${product.name}.\nQuantity: ${quantity}.`;
    if (selectedOptions.length > 0) {
      message += `\nSelected options: ${selectedOptions.join(', ')}.`;
    }
    message += `\n\nPlease provide more information about this product.`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">Product Details</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 p-2 hover:bg-gray-100 rounded-full"
          >
            <X size={24} />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
          {/* Product Images */}
          <div>
            <div className="relative aspect-square mb-4">
              <Image
                src={product.image_url}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover rounded-lg"
              />
            </div>
          </div>

          {/* Product Information */}
          <div className="space-y-6">
          {/* Product Name and Reviews */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
            <div className="flex items-center gap-2">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={20} fill="currentColor" />
                ))}
              </div>
              <span className="text-gray-600">3 Reviews</span>
            </div>
          </div>

          {/* Price */}
          {product.show_price && (
            <div className="text-3xl font-bold text-green-600">Contact for Price</div>
          )}

          {/* Description */}
          <p className="text-gray-600">
            {product.description}
          </p>

          {/* Features */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Key Features:</h3>
            <div className="space-y-2">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <Check size={20} className="text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Options */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Additional Options:</h3>
            <div className="space-y-2">
              {additionalOptions.map((option, index) => (
                <label key={index} className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded">
                  <input
                    type="checkbox"
                    checked={selectedOptions.includes(option)}
                    onChange={() => toggleOption(option)}
                    className="w-4 h-4 text-green-600 rounded focus:ring-green-500"
                  />
                  <span className="text-gray-700">{option}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Quantity:</label>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-100"
              >
                -
              </button>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-20 text-center border border-gray-300 rounded-lg px-3 py-2"
                min="1"
              />
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-100"
              >
                +
              </button>
            </div>
          </div>

          {/* Use Case */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">Perfect for:</h3>
            <p className="text-blue-700">
              Compounds, gates, farms, schools, and roadside security.
            </p>
          </div>

          {/* Delivery Information */}
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-semibold text-green-900 mb-2">Delivery Information:</h3>
            <div className="space-y-1 text-green-700">
              <div className="flex items-center gap-2">
                <Check size={16} />
                <span>Free Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <Check size={16} />
                <span>Pay on Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <Check size={16} />
                <span>Estimated Time: 2-3 days</span>
              </div>
            </div>
          </div>

          {/* WhatsApp Contact Button */}
          <button
            onClick={handleWhatsAppContact}
            className="w-full bg-green-500 text-white py-4 px-6 rounded-lg font-semibold hover:bg-green-600 transition-colors flex items-center justify-center gap-3 text-lg"
          >
            <MessageCircle size={24} />
            Contact WhatsApp
          </button>
        </div>
        </div>
        </div>
      </div>

  );
}
