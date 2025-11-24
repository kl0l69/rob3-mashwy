import React from 'react';
import { ChefHat, Heart } from 'lucide-react';
import { SOCIAL_LINKS, CONTACT_INFO } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer id="contact" className="bg-stone-900 text-stone-300 pt-12 md:pt-16 pb-8 border-t-4 border-orange-600 relative overflow-hidden scroll-mt-24">
      {/* Background glow for tech feel */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-orange-600/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 mb-10 md:mb-12 text-center md:text-right">
          
          {/* About Section & Social Icons */}
          <div className="space-y-8 flex flex-col items-center md:items-start">
            <div>
              <div className="flex items-center justify-center md:justify-start gap-2 mb-4 text-orange-500">
                <ChefHat className="w-8 h-8 stroke-[1.5]" />
                <h2 className="text-3xl font-bold text-white">ربع مشوي</h2>
              </div>
              <p className="text-stone-400 leading-relaxed max-w-md md:border-r-4 border-orange-600 md:pr-4 mx-auto md:mx-0">
                نحن نقدم تجربة طعام فريدة تمزج بين الأصالة والجودة. نستخدم أجود أنواع اللحوم الطازجة والتوابل الطبيعية.
              </p>
            </div>

            {/* Social Icons */}
            <div className="w-full flex flex-col items-center md:items-start">
               <h3 className="text-sm font-bold text-stone-500 uppercase tracking-widest mb-4">تابعنا على</h3>
               <div className="flex flex-wrap justify-center md:justify-start gap-3">
                {SOCIAL_LINKS.map((social) => (
                  <a 
                    key={social.name} 
                    href={social.url} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group w-12 h-12 flex items-center justify-center rounded-full border border-stone-700 bg-transparent hover:bg-stone-800 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg ${social.color}`}
                    aria-label={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Details */}
          <div className="space-y-6 md:justify-self-end w-full max-w-md mx-auto md:mx-0">
            <h3 className="text-xl font-bold text-white mb-6 inline-flex items-center gap-2 justify-center md:justify-start w-full">
              <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span>
              معلومات التواصل
            </h3>
            <ul className="space-y-4">
              {CONTACT_INFO.map((info, idx) => (
                <li key={idx}>
                  <a 
                    href={info.href}
                    target={info.href.startsWith('http') ? "_blank" : undefined}
                    rel={info.href.startsWith('http') ? "noopener noreferrer" : undefined}
                    className="flex flex-col md:flex-row items-center gap-4 group p-2 rounded-2xl transition-all hover:bg-stone-800/30"
                  >
                    <span className="w-12 h-12 flex items-center justify-center rounded-full border border-stone-700 bg-stone-900/50 group-hover:border-orange-500/50 group-hover:bg-stone-800 group-hover:text-orange-500 text-stone-400 transition-all duration-300 shrink-0 shadow-sm">
                      {info.icon}
                    </span>
                    <span className="group-hover:text-white text-stone-300 transition-colors font-mono dir-ltr text-sm md:text-base break-words text-center md:text-right">
                      {info.text}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-stone-800 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center text-sm text-stone-500 gap-4">
          <p>© {new Date().getFullYear()} مطعم ربع مشوي. جميع الحقوق محفوظة.</p>
          <div className="flex items-center gap-1">
            <span>صنع بكل</span>
            <Heart className="w-4 h-4 text-red-500 fill-current animate-pulse" />
            <span>في مصر</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;