'use client';

import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-gray-900">SOLAR LUMINA</h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-2">
              <li>
                <Link 
                  href="/" 
                  className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${
                    isActive('/') 
                      ? 'bg-green-600 text-white' 
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  href="/street-lights" 
                  className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${
                    isActive('/street-lights') 
                      ? 'bg-green-600 text-white' 
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  Street Lights
                </Link>
              </li>
              <li>
                <Link 
                  href="/accessories" 
                  className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${
                    isActive('/accessories') 
                      ? 'bg-green-600 text-white' 
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  Accessories
                </Link>
              </li>
              <li>
                <Link 
                  href="/info" 
                  className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${
                    isActive('/info') 
                      ? 'bg-green-600 text-white' 
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  + Info
                </Link>
              </li>
            </ul>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-gray-900 p-2"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="space-y-2">
              <Link 
                href="/" 
                className={`block px-4 py-2 text-base font-medium rounded-full transition-all ${
                  isActive('/') 
                    ? 'bg-green-600 text-white' 
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                Home
              </Link>
              <Link 
                href="/street-lights" 
                className={`block px-4 py-2 text-base font-medium rounded-full transition-all ${
                  isActive('/street-lights') 
                    ? 'bg-green-600 text-white' 
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                Street Lights
              </Link>
              <Link 
                href="/accessories" 
                className={`block px-4 py-2 text-base font-medium rounded-full transition-all ${
                  isActive('/accessories') 
                    ? 'bg-green-600 text-white' 
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                Accessories
              </Link>
              <Link 
                href="/info" 
                className={`block px-4 py-2 text-base font-medium rounded-full transition-all ${
                  isActive('/info') 
                    ? 'bg-green-600 text-white' 
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                + Info
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
