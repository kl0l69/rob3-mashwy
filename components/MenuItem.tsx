import React, { useState, useRef } from 'react';
import { Plus, Minus, MessageCircle, Bike, ShoppingBag, Utensils, LocateFixed, ChevronDown, ChevronUp, AlertCircle, Check, PenLine } from 'lucide-react';
import { MenuItemType } from '../types';
import { WHATSAPP_NUMBER } from '../constants';

interface Props {
  item: MenuItemType;
  onAddToCart: (item: MenuItemType, quantity: number, note: string) => void;
}

type OrderType = 'delivery' | 'takeaway' | 'dine-in';

const MenuItem: React.FC<Props> = ({ item, onAddToCart }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [orderType, setOrderType] = useState<OrderType>('delivery');
  const [address, setAddress] = useState('');
  const [deliveryTime, setDeliveryTime] = useState('في أقرب وقت');
  const [note, setNote] = useState('');
  const [isOrdered, setIsOrdered] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const addressInputRef = useRef<HTMLTextAreaElement>(null);

  // Price Calculation Helpers
  const getPriceNumbers = () => {
    const matches = item.price.match(/(\d+)/g);
    if (matches) return matches.map(Number);
    return [];
  };

  const priceNumbers = getPriceNumbers();

  // Calculate base total
  const getBaseTotalNumbers = () => {
    if (priceNumbers.length === 0) return [0];
    return priceNumbers.map(p => p * quantity);
  };

  const calculateDisplayTotal = (numbers: number[]) => {
    if (numbers.length === 0) return item.price;
    if (numbers.length > 1) {
      return `${numbers[0]} - ${numbers[1]}`;
    }
    return numbers[0].toLocaleString();
  };

  const increment = () => setQuantity((q) => q + 1);
  const decrement = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  const handleGetLocation = () => {
    if (!("geolocation" in navigator)) {
      alert("خاصية تحديد الموقع غير مدعومة في متصفحك");
      return;
    }

    setIsLocating(true);
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const mapsLink = `https://maps.google.com/?q=${latitude},${longitude}`;
        
        setAddress((prev) => {
           if (!prev.trim()) return `موقعي: ${mapsLink}`;
           return `${prev} \n📍 ${mapsLink}`;
        });
        
        setIsLocating(false);
        setShowDetails(true);
      },
      (error) => {
        setIsLocating(false);
        switch(error.code) {
            case error.PERMISSION_DENIED:
                alert("يرجى السماح بالوصول للموقع لتحديد مكانك");
                break;
            case error.POSITION_UNAVAILABLE:
                alert("معلومات الموقع غير متوفرة حالياً");
                break;
            case error.TIMEOUT:
                alert("انتهت مهلة طلب الموقع");
                break;
            default:
                alert("حدث خطأ أثناء تحديد الموقع");
        }
      }
    );
  };

  const handleAddToCartClick = () => {
    onAddToCart(item, quantity, note);
    setIsAddedToCart(true);
    setTimeout(() => setIsAddedToCart(false), 2000);
    // Reset quantity after adding? Optional. Kept simple for now.
  };

  const handleWhatsAppOrder = () => {
    setErrorMsg('');
    
    // Validation for delivery
    if (orderType === 'delivery' && !address.trim()) {
        setShowDetails(true);
        setErrorMsg('يرجى إدخال العنوان لإتمام طلب التوصيل');
        setTimeout(() => {
            addressInputRef.current?.focus();
        }, 300);
        return;
    }

    let typeText = '';
    switch(orderType) {
      case 'delivery': typeText = '🛵 توصيل للمنزل'; break;
      case 'takeaway': typeText = '🥡 استلام من المطعم (تيك أواي)'; break;
      case 'dine-in': typeText = '🍽️ تناول في المطعم (صالة)'; break;
    }

    const baseTotalStr = calculateDisplayTotal(getBaseTotalNumbers());
    
    let message = `*طلب جديد من الموقع 🍗*\n`;
    message += `----------------------------\n`;
    message += `*النوع:* ${typeText}\n`;
    message += `*الطلب:* ${quantity}x ${item.name}\n`; 
    message += `*السعر الإجمالي:* ${baseTotalStr} جنيه\n`;
    
    if (orderType === 'delivery') {
      if (address.trim()) {
        message += `*العنوان:* ${address.trim()}\n`;
      }
      if (deliveryTime.trim()) {
        message += `*وقت التوصيل:* ${deliveryTime.trim()}\n`;
      }
    }
    
    if (note.trim()) {
      message += `*ملاحظات:* ${note.trim()}\n`;
    }
    
    message += `----------------------------\n`;
    message += `يرجى تأكيد الاستلام.`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    
    setIsOrdered(true);
    window.open(url, '_blank');
    
    setTimeout(() => {
      setIsOrdered(false);
    }, 2000);
  };

  return (
    <div className="group relative flex flex-col bg-white dark:bg-stone-900 rounded-[1.5rem] overflow-hidden shadow-lg shadow-stone-200/50 dark:shadow-none hover:shadow-2xl border border-stone-100 dark:border-stone-800 transition-all duration-300 hover:-translate-y-1 h-full">
      
      {/* Image Section */}
      <div className="relative h-48 md:h-56 overflow-hidden bg-stone-200 dark:bg-stone-800">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover transform origin-center transition-transform duration-500 ease-out group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 to-transparent opacity-60"></div>
        
        {/* Price Tag */}
        <div className="absolute bottom-3 left-3 bg-white/20 backdrop-blur-md border border-white/30 px-3 py-1 rounded-xl text-white font-bold shadow-sm flex items-center gap-1">
          <span className="text-xs font-medium text-stone-100">ج.م</span>
          <span className="text-lg tracking-tight">{item.price}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 md:p-5 flex flex-col flex-grow">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-stone-800 dark:text-stone-100 mb-1 leading-tight">
            {item.name}
          </h3>
          <p className="text-stone-500 dark:text-stone-400 text-sm leading-relaxed line-clamp-2">
            {item.description}
          </p>
        </div>

        {/* Details Toggle Button */}
        <button 
          onClick={() => setShowDetails(!showDetails)}
          className={`w-full py-2 mb-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 border border-dashed ${
             showDetails 
             ? 'bg-orange-50 dark:bg-stone-800 text-orange-600 border-orange-200 dark:border-orange-900/50' 
             : 'bg-stone-50 dark:bg-stone-800/50 text-stone-500 dark:text-stone-400 border-stone-200 dark:border-stone-700 hover:bg-orange-50 dark:hover:bg-stone-800 hover:text-orange-600'
          }`}
        >
          {showDetails ? (
             <>
               <span>إخفاء التفاصيل</span>
               <ChevronUp className="w-3 h-3" />
             </>
          ) : (
             <>
               <span>تفاصيل الطلب (العنوان، الملاحظات)</span>
               <ChevronDown className="w-3 h-3" />
             </>
          )}
        </button>

        {/* Collapsible Details Section */}
        <div className={`overflow-hidden transition-all duration-500 ease-in-out ${showDetails ? 'max-h-[1000px] opacity-100 mb-4' : 'max-h-0 opacity-0'}`}>
           <div className="space-y-4 pt-1">
              
              {/* Order Type Selector */}
              <div className="grid grid-cols-3 gap-1 bg-stone-100 dark:bg-stone-950/50 p-1 rounded-xl border border-stone-200 dark:border-stone-800">
                {[
                  { id: 'delivery', icon: Bike, label: 'توصيل' },
                  { id: 'takeaway', icon: ShoppingBag, label: 'تيك أواي' },
                  { id: 'dine-in', icon: Utensils, label: 'صالة' }
                ].map((type) => (
                  <button
                    key={type.id}
                    onClick={() => {
                        setOrderType(type.id as OrderType);
                        setErrorMsg('');
                    }}
                    className={`flex flex-col items-center justify-center py-2 rounded-lg text-[10px] md:text-xs font-bold transition-all ${
                      orderType === type.id 
                        ? 'bg-white dark:bg-stone-800 text-orange-600 shadow-sm' 
                        : 'text-stone-400 hover:bg-stone-200/50 dark:hover:bg-stone-800/50'
                    }`}
                  >
                    <type.icon className="w-3 h-3 mb-1" />
                    {type.label}
                  </button>
                ))}
              </div>

              {/* Delivery Specific Fields */}
              {orderType === 'delivery' && (
                 <div className="space-y-3 animate-fade-in">
                    {/* Address Textarea with Geolocation */}
                    <div className="relative group/input">
                        <label className="text-[10px] font-bold text-stone-500 dark:text-stone-400 mb-1 block px-1">
                            عنوان التوصيل (بالتفصيل) <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <textarea
                              ref={addressInputRef}
                              placeholder="اسم الشارع، رقم العقار، الدور، علامة مميزة..."
                              value={address}
                              onChange={(e) => {
                                  setAddress(e.target.value);
                                  if(e.target.value) setErrorMsg('');
                              }}
                              rows={3}
                              className={`w-full pr-3 pl-9 py-2 text-xs bg-stone-50 dark:bg-stone-800/50 border rounded-xl focus:ring-1 focus:ring-orange-500 outline-none transition-all resize-none ${
                                  errorMsg && !address.trim() 
                                  ? 'border-red-300 focus:border-red-500 bg-red-50 dark:bg-red-900/10' 
                                  : 'border-stone-200 dark:border-stone-700 focus:border-orange-500'
                              }`}
                            />
                            <button
                                onClick={handleGetLocation}
                                disabled={isLocating}
                                className={`absolute left-2 bottom-2 p-1.5 rounded-lg transition-all ${
                                    isLocating 
                                    ? 'bg-orange-100 text-orange-600' 
                                    : 'bg-stone-200 dark:bg-stone-700 text-stone-500 dark:text-stone-400 hover:bg-orange-500 hover:text-white'
                                }`}
                                title="تحديد موقعي"
                            >
                                {isLocating ? <div className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin"></div> : <LocateFixed className="w-3 h-3" />}
                            </button>
                        </div>
                        {errorMsg && !address.trim() && (
                            <p className="text-[10px] text-red-500 mt-1 flex items-center gap-1 animate-pulse">
                                <AlertCircle className="w-3 h-3" />
                                {errorMsg}
                            </p>
                        )}
                    </div>

                    {/* Delivery Time Selector */}
                    <div className="space-y-1.5">
                       <label className="text-[10px] font-bold text-stone-500 dark:text-stone-400 block px-1">وقت التوصيل</label>
                       <div className="flex flex-wrap gap-2">
                          {['في أقرب وقت', '45 دقيقة', 'ساعة'].map((t) => (
                             <button
                               key={t}
                               onClick={() => setDeliveryTime(t)}
                               className={`px-2 py-1 rounded-md text-[10px] font-bold border transition-all ${
                                 deliveryTime === t 
                                   ? 'bg-orange-100 border-orange-500 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-800' 
                                   : 'bg-white dark:bg-stone-800 border-stone-200 dark:border-stone-700 text-stone-500'
                               }`}
                             >
                               {t}
                             </button>
                          ))}
                       </div>
                    </div>
                 </div>
              )}

              {/* Notes Input */}
              <div>
                  <label className="text-[10px] font-bold text-stone-500 dark:text-stone-400 mb-1 block px-1">ملاحظات إضافية</label>
                  <div className="relative">
                    <PenLine className="absolute right-3 top-2.5 w-3.5 h-3.5 text-stone-400" />
                    <input
                      type="text"
                      placeholder="بدون طماطم، زيادة عيش..."
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      className="w-full pr-9 pl-3 py-2 text-xs bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl focus:border-orange-500 outline-none transition-all"
                    />
                  </div>
              </div>
           </div>
        </div>

        {/* Bottom Actions - Always Visible */}
        <div className="mt-auto pt-2 border-t border-stone-100 dark:border-stone-800/50 flex items-center gap-2">
            {/* Quantity Selector */}
            <div className="flex items-center bg-stone-100 dark:bg-stone-800 rounded-full p-1 border border-stone-200 dark:border-stone-700">
                <button onClick={decrement} className="w-8 h-8 flex items-center justify-center rounded-full bg-white dark:bg-stone-700 text-stone-600 dark:text-stone-300 hover:text-orange-600 shadow-sm transition-colors" aria-label="Decrease quantity">
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-6 text-center font-bold text-base text-stone-800 dark:text-stone-100 tabular-nums">{quantity}</span>
                <button onClick={increment} className="w-8 h-8 flex items-center justify-center rounded-full bg-orange-500 text-white shadow-md shadow-orange-500/20 transition-transform active:scale-95" aria-label="Increase quantity">
                  <Plus className="w-3.5 h-3.5" />
                </button>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCartClick}
              className={`w-10 h-10 flex items-center justify-center rounded-full shadow-lg transition-all active:scale-95 border ${
                isAddedToCart 
                 ? 'bg-green-500 border-green-400 text-white' 
                 : 'bg-stone-800 dark:bg-stone-700 border-stone-700 text-white hover:bg-stone-700'
              }`}
              title="إضافة للسلة"
            >
               {isAddedToCart ? <Check className="w-5 h-5" /> : <ShoppingBag className="w-5 h-5" />}
            </button>

            {/* Order Button */}
            <button
                onClick={handleWhatsAppOrder}
                className={`flex-1 flex items-center justify-between px-3 py-2.5 rounded-full shadow-lg transition-all active:scale-95 ${
                  isOrdered 
                    ? 'bg-green-600 text-white shadow-green-500/30'
                    : 'bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white shadow-orange-500/30'
                }`}
              >
                {isOrdered ? (
                  <div className="mx-auto flex items-center gap-2 animate-fade-in">
                     <Check className="w-4 h-4" />
                     <span className="text-xs font-bold">تم</span>
                  </div>
                ) : (
                  <>
                    <span className="font-bold text-xs sm:text-sm flex items-center gap-1.5">
                      <MessageCircle className="w-4 h-4" />
                      <span>اطلب</span>
                    </span>
                    <div className="flex flex-col items-end leading-none">
                       <span className="bg-black/10 px-2 py-0.5 rounded-lg text-[10px] font-bold">
                         {calculateDisplayTotal(getBaseTotalNumbers())} ج.م
                       </span>
                    </div>
                  </>
                )}
            </button>
        </div>
      </div>
    </div>
  );
};

export default MenuItem;