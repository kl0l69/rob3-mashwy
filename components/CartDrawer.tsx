import React, { useState, useEffect } from 'react';
import { X, ShoppingBag, Plus, Minus, Trash2, Bike, Store, MapPin, LocateFixed, AlertCircle, MessageCircle } from 'lucide-react';
import { CartItem } from '../types';
import { WHATSAPP_NUMBER } from '../constants';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemoveItem: (cartId: string) => void;
  onUpdateQuantity: (cartId: string, delta: number) => void;
}

type OrderType = 'delivery' | 'takeaway';

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, items, onRemoveItem, onUpdateQuantity }) => {
  const [orderType, setOrderType] = useState<OrderType>('delivery');
  const [address, setAddress] = useState('');
  const [isLocating, setIsLocating] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Prevent background scrolling when cart is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  // Calculate estimated total
  const totalPrice = items.reduce((acc, item) => {
    // Parse the first number found in price string (e.g., "85-280" -> 85)
    const priceMatch = item.price.match(/(\d+)/);
    const unitPrice = priceMatch ? parseInt(priceMatch[0]) : 0;
    return acc + (unitPrice * item.quantity);
  }, 0);

  const handleGetLocation = () => {
    if (!("geolocation" in navigator)) {
      alert("خاصية تحديد الموقع غير مدعومة");
      return;
    }
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const mapsLink = `https://maps.google.com/?q=${latitude},${longitude}`;
        setAddress((prev) => prev.trim() ? `${prev}\n📍 ${mapsLink}` : `موقعي: ${mapsLink}`);
        setIsLocating(false);
      },
      (error) => {
        setIsLocating(false);
        alert("تعذر تحديد الموقع");
      }
    );
  };

  const handleCheckout = () => {
    setErrorMsg('');
    if (orderType === 'delivery' && !address.trim()) {
      setErrorMsg('يرجى إدخال العنوان للاستمرار');
      return;
    }

    let message = `*طلب جديد من السلة 🛍️*\n`;
    message += `----------------------------\n`;
    message += `*النوع:* ${orderType === 'delivery' ? '🛵 توصيل للمنزل' : '🥡 استلام من المطعم'}\n`;
    
    items.forEach((item, index) => {
        message += `\n${index + 1}. *${item.quantity}x ${item.name}*`;
        if (item.note) message += `\n   📝 ملاحظة: ${item.note}`;
    });

    message += `\n\n----------------------------\n`;
    message += `*الإجمالي التقديري:* ${totalPrice} جنيه\n`;
    
    if (orderType === 'delivery' && address.trim()) {
        message += `*العنوان:* ${address.trim()}\n`;
    }

    message += `----------------------------\n`;
    message += `يرجى تأكيد الطلب.`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 z-[60] bg-stone-950/60 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div className={`fixed inset-y-0 right-0 z-[70] w-full max-w-md bg-white dark:bg-stone-900 shadow-2xl transform transition-transform duration-300 ease-out flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-stone-100 dark:border-stone-800">
            <h2 className="text-xl font-black text-stone-800 dark:text-stone-100 flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-orange-500" />
                سلة الطلبات
            </h2>
            <button onClick={onClose} className="p-2 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-full transition-colors">
                <X className="w-6 h-6 text-stone-500" />
            </button>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center text-stone-400 space-y-4">
                    <div className="w-16 h-16 bg-stone-100 dark:bg-stone-800 rounded-full flex items-center justify-center">
                        <ShoppingBag className="w-8 h-8 opacity-50" />
                    </div>
                    <p className="text-lg font-medium">السلة فارغة</p>
                    <button onClick={onClose} className="text-orange-500 font-bold hover:underline">تصفح القائمة</button>
                </div>
            ) : (
                items.map((item) => (
                    <div key={item.cartId} className="flex gap-3 bg-stone-50 dark:bg-stone-800/50 p-3 rounded-2xl border border-stone-100 dark:border-stone-800">
                        <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-xl" />
                        <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-stone-800 dark:text-stone-100 truncate">{item.name}</h3>
                            <p className="text-xs text-stone-500 dark:text-stone-400 font-medium">{item.price} ج.م</p>
                            {item.note && <p className="text-[10px] text-orange-600 mt-1 line-clamp-1">📝 {item.note}</p>}
                        </div>
                        <div className="flex flex-col justify-between items-end">
                            <button onClick={() => onRemoveItem(item.cartId)} className="text-red-400 hover:text-red-500 p-1">
                                <Trash2 className="w-4 h-4" />
                            </button>
                            <div className="flex items-center gap-2 bg-white dark:bg-stone-800 rounded-lg p-1 shadow-sm">
                                <button onClick={() => onUpdateQuantity(item.cartId, -1)} className="w-6 h-6 flex items-center justify-center hover:bg-stone-100 dark:hover:bg-stone-700 rounded-md">
                                    <Minus className="w-3 h-3" />
                                </button>
                                <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                                <button onClick={() => onUpdateQuantity(item.cartId, 1)} className="w-6 h-6 flex items-center justify-center hover:bg-stone-100 dark:hover:bg-stone-700 rounded-md text-orange-500">
                                    <Plus className="w-3 h-3" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>

        {/* Footer actions */}
        {items.length > 0 && (
            <div className="p-4 border-t border-stone-100 dark:border-stone-800 bg-white dark:bg-stone-900">
                
                {/* Order Type */}
                <div className="grid grid-cols-2 gap-2 mb-4 bg-stone-100 dark:bg-stone-950 p-1 rounded-xl">
                    <button 
                        onClick={() => setOrderType('delivery')}
                        className={`flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-bold transition-all ${orderType === 'delivery' ? 'bg-white dark:bg-stone-800 text-orange-600 shadow-sm' : 'text-stone-400'}`}
                    >
                        <Bike className="w-4 h-4" /> توصيل
                    </button>
                    <button 
                        onClick={() => setOrderType('takeaway')}
                        className={`flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-bold transition-all ${orderType === 'takeaway' ? 'bg-white dark:bg-stone-800 text-orange-600 shadow-sm' : 'text-stone-400'}`}
                    >
                        <Store className="w-4 h-4" /> استلام
                    </button>
                </div>

                {/* Address Input for Delivery */}
                {orderType === 'delivery' && (
                    <div className="mb-4 space-y-2 animate-fade-in">
                        <div className="relative">
                            <textarea 
                                value={address}
                                onChange={(e) => {
                                    setAddress(e.target.value);
                                    if(e.target.value) setErrorMsg('');
                                }}
                                placeholder="عنوان التوصيل بالتفصيل..."
                                className={`w-full bg-stone-50 dark:bg-stone-800 border rounded-xl p-3 text-sm focus:ring-1 focus:ring-orange-500 outline-none resize-none h-20 pl-10 ${errorMsg ? 'border-red-300 bg-red-50' : 'border-stone-200 dark:border-stone-700'}`}
                            />
                            <MapPin className="absolute right-3 top-3 w-4 h-4 text-stone-400" />
                            <button onClick={handleGetLocation} className="absolute left-2 bottom-2 p-1.5 bg-orange-100 text-orange-600 rounded-lg hover:bg-orange-200 transition-colors">
                                {isLocating ? <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"/> : <LocateFixed className="w-4 h-4" />}
                            </button>
                        </div>
                        {errorMsg && <p className="text-xs text-red-500 flex items-center gap-1"><AlertCircle className="w-3 h-3"/> {errorMsg}</p>}
                    </div>
                )}

                {/* Total & Checkout */}
                <div className="flex items-center justify-between mb-4">
                    <span className="text-stone-500 font-bold">الإجمالي التقديري</span>
                    <span className="text-2xl font-black text-stone-800 dark:text-stone-100">{totalPrice} <span className="text-sm text-stone-500 font-medium">ج.م</span></span>
                </div>

                <button 
                    onClick={handleCheckout}
                    className="w-full py-4 bg-gradient-to-r from-green-600 to-green-500 text-white font-bold rounded-xl shadow-lg shadow-green-500/20 hover:-translate-y-1 transition-all flex items-center justify-center gap-2 text-lg"
                >
                    <MessageCircle className="w-6 h-6" />
                    <span>إتمام الطلب على واتساب</span>
                </button>
            </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;