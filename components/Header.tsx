import React, { useState, useEffect } from 'react';
import { Menu, X, Flame, Moon, Sun, ShoppingBag } from 'lucide-react';
import { SOCIAL_LINKS } from '../constants';
import { CartItem } from '../types';

interface HeaderProps {
  isDark: boolean;
  toggleTheme: () => void;
  cartCount: number;
  onOpenCart: () => void;
}

const Header: React.FC<HeaderProps> = ({ isDark, toggleTheme, cartCount, onOpenCart }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = () => {
    setIsOpen(false);
  };

  const navLinks = [
    { name: 'الرئيسية', href: '#home' },
    { name: 'القائمة', href: '#menu' },
    { name: 'الأكثر طلباً', href: '#popular' },
    { name: 'تواصل معنا', href: '#contact' },
  ];

  return (
    <>
      <header 
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled || isOpen
            ? 'bg-stone-950/90 backdrop-blur-lg border-b border-white/5 py-3 shadow-lg' 
            : 'bg-transparent py-4 md:py-5'
        }`}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          {/* Logo */}
          <a 
            href="#home" 
            onClick={handleNavClick}
            className="flex items-center gap-2.5 group cursor-pointer z-50 relative select-none"
          >
            <div className="bg-gradient-to-br from-orange-500 to-red-600 p-2 md:p-2.5 rounded-xl md:rounded-2xl transform group-hover:rotate-12 transition-transform duration-300 shadow-lg shadow-orange-500/20">
              <Flame className="w-5 h-5 md:w-6 md:h-6 text-white fill-white" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-black leading-none tracking-tight transition-colors text-white">
                ربع <span className="text-orange-500">مشوي</span>
              </h1>
              <span className={`text-[9px] md:text-[10px] font-medium tracking-[0.2em] uppercase ${scrolled || isOpen ? 'text-stone-400' : 'text-stone-300/80'}`}>
                Rob3 Mashwy
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <nav className="flex gap-1 bg-white/5 p-1 rounded-full backdrop-blur-sm border border-white/10">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="px-5 py-2 text-sm font-medium text-stone-200 rounded-full hover:bg-white/10 hover:text-white transition-all duration-200"
                >
                  {link.name}
                </a>
              ))}
            </nav>
            
            <div className="flex items-center gap-3">
              {/* Theme Toggle Button */}
              <button 
                onClick={toggleTheme}
                className="group relative w-10 h-10 flex items-center justify-center rounded-full bg-stone-800/80 hover:bg-stone-700 text-orange-500 transition-all duration-300 border border-white/10 hover:border-orange-500/50 shadow-md hover:shadow-orange-500/20 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/0 to-orange-500/0 group-hover:from-orange-500/10 group-hover:to-red-500/10 transition-all duration-500"></div>
                {isDark ? (
                  <Sun className="w-5 h-5 stroke-2 relative z-10 transition-transform duration-500 group-hover:rotate-180" />
                ) : (
                  <Moon className="w-5 h-5 stroke-2 relative z-10 transition-transform duration-300 group-hover:-rotate-12" />
                )}
              </button>

              {/* Cart Button */}
              <button 
                onClick={onOpenCart}
                className="group relative w-10 h-10 flex items-center justify-center rounded-full bg-stone-800/80 hover:bg-stone-700 text-white transition-all duration-300 border border-white/10 hover:border-orange-500/50 shadow-md"
                aria-label="Shopping Cart"
              >
                <ShoppingBag className="w-5 h-5 stroke-2" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-orange-600 text-white text-[10px] font-bold flex items-center justify-center rounded-full shadow-sm animate-bounce">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Controls */}
          <div className="md:hidden flex items-center gap-3 z-50">
             {/* Cart Button Mobile */}
             <button 
                onClick={onOpenCart}
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-stone-800/60 backdrop-blur text-white border border-white/10 active:scale-95 transition-transform relative"
                aria-label="Shopping Cart Mobile"
              >
                <ShoppingBag className="w-5 h-5 stroke-2" />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-orange-600 text-white text-[10px] font-bold flex items-center justify-center rounded-full shadow-sm animate-bounce">
                    {cartCount}
                  </span>
                )}
            </button>

            <button 
              onClick={toggleTheme}
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-stone-800/60 backdrop-blur text-orange-500 border border-white/10 active:scale-95 transition-transform"
            >
              {isDark ? <Sun className="w-5 h-5 stroke-2" /> : <Moon className="w-5 h-5 stroke-2" />}
            </button>
            
            <button
              className="w-10 h-10 flex items-center justify-center text-white hover:text-orange-500 focus:outline-none transition-colors"
              onClick={toggleMenu}
            >
              {isOpen ? <X className="w-8 h-8 stroke-2" /> : <Menu className="w-8 h-8 stroke-2" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-stone-950/95 backdrop-blur-xl md:hidden transition-all duration-500 ease-[cubic-bezier(0.32,0.725,0,1)] ${
          isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-8 p-6">
          <nav className="flex flex-col items-center gap-6 w-full max-w-xs">
            {navLinks.map((link, idx) => (
              <a
                key={link.name}
                href={link.href}
                onClick={handleNavClick}
                className={`block w-full py-4 text-center text-2xl font-bold text-stone-200 hover:text-orange-500 border-b border-stone-800 hover:border-orange-500/50 transition-all duration-300 transform ${
                   isOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
                }`}
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                {link.name}
              </a>
            ))}
          </nav>
          
          <div className="mt-8 text-center w-full">
             <p className="text-stone-500 text-sm mb-6 tracking-widest uppercase font-semibold">تابعنا على</p>
             <div className="flex justify-center gap-4 flex-wrap">
               {SOCIAL_LINKS.map((social, idx) => (
                 <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group w-10 h-10 flex items-center justify-center rounded-full border border-stone-700 hover:bg-stone-800 text-stone-400 active:scale-95 transition-all duration-300 ${social.color}`}
                    style={{ transitionDelay: `${idx * 50 + 400}ms` }}
                 >
                   {social.icon}
                 </a>
               ))}
             </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;