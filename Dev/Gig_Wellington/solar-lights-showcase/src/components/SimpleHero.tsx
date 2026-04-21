'use client';

import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function SimpleHero() {
  return (
    <section className="bg-gradient-to-r from-green-600 to-blue-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Light Up Your World
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Discover our premium solar lighting solutions. Energy-efficient, sustainable, and perfect for any space.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/street-lights"
              className="inline-flex items-center justify-center px-8 py-3 bg-white text-green-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Explore Products
              <ArrowRight className="ml-2" size={20} />
            </Link>
            <Link 
              href="/info"
              className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-green-600 transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
