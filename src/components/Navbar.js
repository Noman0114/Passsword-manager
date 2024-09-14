'use client';
import { useState } from 'react';
import { ShieldCheck, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { Button } from "@/components/ui/button"

// Navbar component
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
    <header className="px-4 lg:px-6 h-14 flex items-center border-b ">
        <Link className="flex items-center justify-center" href="/" aria-label="Home">
          <ShieldCheck className="h-6 w-6 text-blue-600" />
          <span className="ml-2 text-2xl font-bold text-gray-900">SecurePass</span>
        </Link>
        <nav className="ml-auto hidden md:flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#features">
            Features
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/dashboard">
           Dashboard
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#about">
            About
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#contact">
            Contact
          </Link>
        </nav>
      
        <Button
          className="ml-auto md:hidden"
          variant="ghost"
          size="icon"
          aria-label="Toggle Menu"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </header>
      {isMenuOpen && (
        <div className="md:hidden">
          <nav className="flex flex-col items-center py-4 bg-white border-b">
            <Link className="w-full text-center py-2 hover:bg-gray-100" href="#features">
              Features
            </Link>
            <Link className="w-full text-center py-2 hover:bg-gray-100" href="/dashboard">
              Dashboard
            </Link>
            <Link className="w-full text-center py-2 hover:bg-gray-100" href="#about">
              About
            </Link>
            <Link className="w-full text-center py-2 hover:bg-gray-100" href="#contact">
              Contact
            </Link>
           
          </nav>
        </div>
      )} 
</>
    )
};

export default Navbar;
