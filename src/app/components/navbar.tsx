'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-purple-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo / Brand */}
        <div className="text-xl font-bold">
          <Link href="/">Rent-A-Car</Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 text-sm font-medium">
          <Link className="hover:text-purple-200 transition" href="/">Home</Link>
          <Link className="hover:text-purple-200 transition" href="/cars">Cars</Link>
          <Link className="hover:text-purple-200 transition" href="/book">Book Now</Link>
          <Link className="hover:text-purple-200 transition" href="/reservations">Reservations</Link>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Items */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 text-sm font-medium bg-purple-800">
          <Link className="block hover:text-purple-200 transition" href="/">Home</Link>
          <Link className="block hover:text-purple-200 transition" href="/cars">Cars</Link>
          <Link className="block hover:text-purple-200 transition" href="/book">Book Now</Link>
          <Link className="block hover:text-purple-200 transition" href="/reservations">Reservations</Link>
        </div>
      )}
    </nav>
  );
}
