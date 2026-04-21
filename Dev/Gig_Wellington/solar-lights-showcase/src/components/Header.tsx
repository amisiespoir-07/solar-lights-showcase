'use client';

import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
            <ul className="flex space-x-8">
              <li><Link href="/" className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium">Home</Link></li>
              <li><Link href="/street-lights" className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium">Street Lights</Link></li>
              <li><Link href="/accessories" className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium">Accessories</Link></li>
              <li><Link href="/info" className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium">+ Info</Link></li>
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
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link href="/" className="text-gray-700 hover:text-gray-900 block px-3 py-2 text-base font-medium">Home</Link>
              <Link href="/street-lights" className="text-gray-700 hover:text-gray-900 block px-3 py-2 text-base font-medium">Street Lights</Link>
              <Link href="/accessories" className="text-gray-700 hover:text-gray-900 block px-3 py-2 text-base font-medium">Accessories</Link>
              <Link href="/info" className="text-gray-700 hover:text-gray-900 block px-3 py-2 text-base font-medium">+ Info</Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
