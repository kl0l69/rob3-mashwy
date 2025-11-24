import React from 'react';
import { ArrowDown, Flame } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section id="home" className="relative h-[95vh] min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Dynamic Background Image with Zoom Effect */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Dark overlay for text readability */}
        <div className="w-full h-full bg-stone-950 absolute inset-0 z-10 opacity-60 mix-blend-multiply"></div>
        
        {/* Gradient fade from bottom */}
        <div className="w-full h-full bg-gradient-to-t from-stone-950 via-stone-900/60 to-transparent absolute inset-0 z-20"></div>
        
        {/* Oriental/Egyptian Pattern Overlay */}
        <div className="absolute inset-0 z-10 opacity-[0.07] bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] pointer-events-none"></div>

        <img
          src="https://images.unsplash.com/photo-1529193591184-b1d580690dd0?q=80&w=2070&auto=format&fit=crop" 
          alt="Grill Banner"
          className="w-full h-full object-cover animate-scale-slow transform origin-center"
          onError={(e) => {
             // Fallback in case the main image fails
             (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1974&auto=format&fit=crop";
          }}
        />
      </div>

      {/* Animated Particles/Sparks */}
      <div className="absolute inset-0 z-20 opacity-30 pointer-events-none overflow-hidden">
         <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-orange-500 rounded-full animate-float blur-[1px]"></div>
         <div className="absolute top-1/2 left-3/4 w-3 h-3 bg-red-500 rounded-full animate-float blur-[2px] delay-700"></div>
         <div className="absolute bottom-1/4 left-1/2 w-1.5 h-1.5 bg-yellow-500 rounded-full animate-float blur-[1px] delay-1000"></div>
      </div>

      {/* Content */}
      <div className="relative z-30 text-center px-4 max-w-5xl mx-auto w-full">
        <div className="animate-fade-in flex flex-col items-center">
          
          <div className="mb-4 sm:mb-8 animate-float">
             <span className="inline-flex items-center gap-2 py-2 px-6 rounded-full bg-stone-900/60 border border-orange-500/30 text-orange-400 text-xs sm:text-sm font-bold backdrop-blur-md shadow-[0_0_20px_rgba(234,88,12,0.2)] animate-pulse-glow">
               <Flame className="w-3 h-3 sm:w-4 sm:h-4 fill-orange-500 text-orange-500" />
              ف ثواني طلبك يكون جاهز
             </span>
          </div>
          
          <h1 className="text-2xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-[1.1] drop-shadow-2xl tracking-tight">
            الطعم  <br className="md:hidden" />
            
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-300 via-orange-500 to-red-600 relative inline-block pb-1">
               الأصلي للمـشــويـات    
               {/* Underline decoration */}
               <svg className="absolute w-full h-2 sm:h-4 -bottom-2 left-0 text-orange-600 hidden md:block opacity-80" viewBox="0 0 100 10" preserveAspectRatio="none">
                 <path d="M0 5 Q 50 15 100 5" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" />
               </svg>
            </span>
          </h1>
          
          <h2 className="text-lg sm:text-2xl md:text-4xl font-bold text-stone-200 mt-2 block tracking-wide max-w-3xl mx-auto leading-relaxed">
             أصل المشويات المصرية.. طعم يرجعك للأصول
          </h2>
          
          <p className="text-sm sm:text-lg md:text-xl text-stone-400 mb-10 md:mb-12 max-w-2xl mx-auto mt-6 leading-relaxed font-light px-4">
            نقدم لكم أشهى المشويات المتبلة بخلطاتنا السرية، محضرة بعناية لتناسب ذوقكم الرفيع في أجواء مصرية أصيلة.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto px-4 animate-slide-up">
            <a
              href="#menu"
              className="group bg-gradient-to-r from-orange-600 to-red-700 hover:from-orange-500 hover:to-red-600 text-white font-bold py-4 px-10 rounded-full shadow-[0_10px_30px_-10px_rgba(234,88,12,0.6)] transform hover:-translate-y-1 hover:scale-105 transition-all duration-300 text-base sm:text-lg w-full sm:w-auto flex items-center justify-center gap-2 border border-orange-500/20"
            >
              <span>شاهد القائمة</span>
              <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
            </a>
            <a
              href="#contact"
              className="bg-white/5 hover:bg-white/10 backdrop-blur-md text-stone-100 border border-white/10 hover:border-white/30 font-bold py-4 px-10 rounded-full shadow-lg transform hover:-translate-y-1 transition-all duration-300 text-base sm:text-lg w-full sm:w-auto"
            >
              تواصل معنا
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-30 opacity-80 hidden sm:flex">
        <a href="#menu" aria-label="Scroll down" className="flex flex-col items-center gap-2 text-stone-400 hover:text-orange-500 transition-colors">
          <span className="text-[10px] uppercase tracking-[0.2em] font-light">اكتشف المزيد</span>
          <div className="w-px h-10 bg-gradient-to-b from-orange-500/0 via-orange-500 to-orange-500/0"></div>
        </a>
      </div>
    </section>
  );
};

export default Hero;