'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

const accessories = [
  { id: 1, name: 'Solar Panel 100W', price: '$89.90', image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=200&h=150&fit=crop' },
  { id: 2, name: 'Lithium Battery 12V', price: '$129.90', image: 'https://images.unsplash.com/photo-1581094794479-3a6516b91875?w=200&h=150&fit=crop' },
  { id: 3, name: 'MPPT Controller', price: '$59.90', image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=200&h=150&fit=crop' },
  { id: 4, name: 'Solar Cable 10m', price: '$29.90', image: 'https://images.unsplash.com/photo-1603792550247-2a9b9a833851?w=200&h=150&fit=crop' },
  { id: 5, name: 'LED Bulb Set', price: '$39.90', image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=200&h=150&fit=crop' },
  { id: 6, name: 'Mounting Bracket', price: '$49.90', image: 'https://images.unsplash.com/photo-1581094794479-3a6516b91875?w=200&h=150&fit=crop' },
];

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % accessories.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + accessories.length) % accessories.length);
  };

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Main Product Image */}
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop"
              alt="Solar Street Light"
              className="w-full h-96 object-cover rounded-lg shadow-lg"
            />
          </div>

          {/* Accessories Section */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Accessories</h2>
            <p className="text-gray-600 mb-6">
              Discover our range of accessories to complete your solar installation.
            </p>

            {/* Carousel */}
            <div className="relative">
              <div className="overflow-hidden">
                <div className="flex transition-transform duration-300 ease-in-out"
                     style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                  {accessories.map((accessory) => (
                    <div key={accessory.id} className="w-full flex-shrink-0 px-2">
                      <div className="bg-gray-100 rounded-lg p-4 text-center">
                        <img
                          src={accessory.image}
                          alt={accessory.name}
                          className="w-full h-32 object-cover rounded mb-3"
                        />
                        <h3 className="font-semibold text-gray-900">{accessory.name}</h3>
                        <p className="text-lg font-bold text-green-600 mt-2">{accessory.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation Buttons */}
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white shadow-md rounded-full p-2 hover:bg-gray-100"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white shadow-md rounded-full p-2 hover:bg-gray-100"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
