import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Footer from './components/Footer';
import MenuItem from './components/MenuItem';
import CartDrawer from './components/CartDrawer';
import { MENU_DATA } from './data/menuData';
import { MenuItemType, CartItem } from './types';
import { Search, Utensils, Flame } from 'lucide-react';

const App: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' || 
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500); 
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  // Cart Logic
  const handleAddToCart = (item: MenuItemType, quantity: number, note: string) => {
    setCartItems(prev => {
      // Simple logic: Add as new item every time to handle different notes/combinations
      // In a complex app, you might find existing item with same ID + Options + Note and increment
      const newItem: CartItem = {
        ...item,
        cartId: Math.random().toString(36).substr(2, 9),
        quantity,
        note
      };
      return [...prev, newItem];
    });
  };

  const handleRemoveFromCart = (cartId: string) => {
    setCartItems(prev => prev.filter(item => item.cartId !== cartId));
  };

  const handleUpdateCartQuantity = (cartId: string, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.cartId === cartId) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : item;
      }
      return item;
    }));
  };

  const cartTotalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Filter Logic
  const filteredData = MENU_DATA.map(category => {
    const filteredItems = category.items.filter(item => 
      item.name.includes(searchTerm) || 
      (item.description && item.description.includes(searchTerm))
    );
    return { ...category, items: filteredItems };
  }).filter(category => 
    category.items.length > 0 && 
    (activeCategory === 'all' || category.id === activeCategory)
  );

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300 bg-stone-50 dark:bg-stone-950">
      
      {/* Splash Screen */}
      <div 
        className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-stone-950 transition-all duration-1000 ease-in-out ${
          isLoading ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
      >
        <div className="relative">
          <div className="absolute inset-0 bg-orange-600 blur-2xl opacity-20 animate-pulse rounded-full"></div>
          <div className="bg-gradient-to-br from-orange-500 to-red-600 p-6 rounded-3xl shadow-2xl shadow-orange-500/20 transform animate-bounce">
            <Flame className="w-12 h-12 text-white fill-white" />
          </div>
        </div>
        <h1 className="mt-8 text-4xl font-black text-white tracking-tight animate-pulse">
          ربع <span className="text-orange-500">مشوي</span>
        </h1>
        <p className="mt-2 text-stone-500 text-sm tracking-[0.3em] uppercase font-medium">
          Rob3 Mashwy
        </p>
        <div className="mt-8 w-48 h-1 bg-stone-800 rounded-full overflow-hidden">
          <div className="h-full bg-orange-500 animate-[width_2s_ease-in-out_infinite]" style={{ width: '0%' }}></div>
        </div>
      </div>

      {/* Main Content */}
      <div className={`flex-grow flex flex-col transition-opacity duration-1000 delay-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        <Header 
          isDark={isDark} 
          toggleTheme={toggleTheme} 
          cartCount={cartTotalItems} 
          onOpenCart={() => setIsCartOpen(true)}
        />
        
        <CartDrawer 
          isOpen={isCartOpen} 
          onClose={() => setIsCartOpen(false)}
          items={cartItems}
          onRemoveItem={handleRemoveFromCart}
          onUpdateQuantity={handleUpdateCartQuantity}
        />
        
        <main className="flex-grow">
          <Hero />
          
          <section id="menu" className="relative py-8 md:py-20">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] opacity-[0.03] dark:opacity-[0.05] pointer-events-none mix-blend-multiply dark:mix-blend-overlay"></div>
            
            <div className="container mx-auto px-4 md:px-6 relative z-10">
              <div className="text-center mb-8 md:mb-16">
                <h2 className="text-3xl md:text-5xl font-black text-stone-800 dark:text-white mb-3 md:mb-4 drop-shadow-sm tracking-tight">
                  قائمة <span className="text-orange-500">الطعام</span>
                </h2>
                <div className="w-16 md:w-20 h-1.5 bg-gradient-to-r from-orange-600 to-orange-400 mx-auto rounded-full mb-4 md:mb-6"></div>
                <p className="text-stone-500 dark:text-stone-400 text-base md:text-lg max-w-lg mx-auto leading-relaxed px-4">
                  تصفح قائمتنا المتنوعة واختر ما يناسب ذوقك من المشويات والمقبلات الشهية
                </p>
              </div>

              {/* Search Bar */}
              <div className="max-w-lg mx-auto mb-8 md:mb-12 relative group z-20">
                <div className="absolute inset-0 bg-orange-500/10 dark:bg-orange-500/5 rounded-3xl blur-xl transition-all group-focus-within:blur-2xl group-focus-within:bg-orange-500/20"></div>
                <div className="relative">
                  <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                    <Search className="w-5 h-5 text-stone-400 group-focus-within:text-orange-500 transition-colors" />
                  </div>
                  <input
                    type="text"
                    placeholder="ابحث عن وجبتك المفضلة (كفتة، فراخ...)"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pr-12 pl-6 py-3.5 md:py-4 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl focus:outline-none focus:border-orange-500 dark:focus:border-orange-500 transition-all shadow-lg shadow-stone-200/50 dark:shadow-none text-stone-800 dark:text-stone-100 text-base md:text-lg placeholder:text-stone-400"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div className="mb-8 md:mb-14 -mx-4 px-4 md:mx-0 overflow-x-auto scrollbar-hide">
                <div className="flex md:flex-wrap md:justify-center gap-2.5 md:gap-3 min-w-max pb-2 px-1">
                  <button
                    onClick={() => setActiveCategory('all')}
                    className={`flex items-center gap-2 px-5 py-2.5 md:px-6 md:py-3 rounded-2xl transition-all duration-300 font-bold whitespace-nowrap shadow-sm hover:shadow-md text-sm md:text-base ${
                      activeCategory === 'all'
                        ? 'bg-orange-600 text-white scale-105 shadow-orange-500/25 ring-2 ring-orange-600 ring-offset-2 ring-offset-stone-50 dark:ring-offset-stone-950'
                        : 'bg-white dark:bg-stone-900 text-stone-600 dark:text-stone-400 border border-stone-200 dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-stone-800'
                    }`}
                  >
                    <Utensils className="w-3.5 h-3.5 md:w-4 md:h-4" />
                    الكل
                  </button>
                  {MENU_DATA.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className={`flex items-center gap-2 px-5 py-2.5 md:px-6 md:py-3 rounded-2xl transition-all duration-300 font-bold whitespace-nowrap shadow-sm hover:shadow-md text-sm md:text-base ${
                        activeCategory === cat.id
                          ? 'bg-orange-600 text-white scale-105 shadow-orange-500/25 ring-2 ring-orange-600 ring-offset-2 ring-offset-stone-50 dark:ring-offset-stone-950'
                          : 'bg-white dark:bg-stone-900 text-stone-600 dark:text-stone-400 border border-stone-200 dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-stone-800'
                      }`}
                    >
                      {cat.icon}
                      {cat.title}
                    </button>
                  ))}
                </div>
              </div>

              {/* Menu Grid */}
              <div className="space-y-16 md:space-y-20">
                {filteredData.length > 0 ? (
                  filteredData.map((category) => (
                    <div key={category.id} id={category.id === 'popular' ? 'popular' : undefined} className="animate-fade-in scroll-mt-24">
                      <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-10">
                        <div className={`p-3 md:p-3.5 rounded-2xl shadow-lg transform rotate-3 ${category.id === 'popular' ? 'bg-gradient-to-br from-yellow-400 to-yellow-600 text-white shadow-yellow-500/30' : 'bg-white dark:bg-stone-800 text-orange-600 border border-stone-200 dark:border-stone-700'}`}>
                          {category.icon}
                        </div>
                        <h3 className={`text-2xl md:text-3xl font-black ${category.id === 'popular' ? 'text-yellow-600 dark:text-yellow-500' : 'text-stone-800 dark:text-stone-200'}`}>
                          {category.title}
                        </h3>
                        <div className="flex-grow h-px bg-gradient-to-l from-transparent via-stone-300 dark:via-stone-700 to-transparent"></div>
                      </div>
                      
                      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8 ${
                        category.id === 'popular' 
                          ? 'p-4 md:p-6 -mx-4 md:mx-0 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/10 dark:to-orange-900/10 rounded-3xl border border-yellow-200/50 dark:border-yellow-900/30' 
                          : ''
                      }`}>
                        {category.items.map((item) => (
                          <MenuItem key={item.id} item={item} onAddToCart={handleAddToCart} />
                        ))}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center py-16 md:py-24 bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-sm text-center mx-4">
                    <div className="w-14 h-14 md:w-16 md:h-16 bg-stone-100 dark:bg-stone-800 rounded-full flex items-center justify-center mb-4">
                       <Search className="w-6 h-6 md:w-8 md:h-8 text-stone-400" />
                    </div>
                    <p className="text-stone-800 dark:text-stone-200 text-lg md:text-xl font-bold mb-2">لا توجد نتائج مطابقة</p>
                    <button 
                      onClick={() => setSearchTerm('')}
                      className="mt-6 text-orange-600 font-bold hover:text-orange-700 hover:underline transition-all text-sm md:text-base"
                    >
                      عرض القائمة كاملة
                    </button>
                  </div>
                )}
              </div>
            </div>
          </section>

          <Footer />
        </main>
      </div>
    </div>
  );
};

export default App;