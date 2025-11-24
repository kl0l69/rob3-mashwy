import React from 'react';
import { MenuCategory } from '../types';
import { Flame, Soup, LeafyGreen, UtensilsCrossed, Cherry, Coffee, Droplets, Star } from 'lucide-react';

export const MENU_DATA: MenuCategory[] = [
  {
    id: 'popular',
    title: 'الأكثر طلباً',
    icon: <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />,
    items: [
      { id: 'g1', name: 'فرخة مشوية', price: '120', description: 'فرخة كاملة متبلة بخلطة الأعشاب الخاصة ومشوية على الفحم.', image: '/images/grill/chicken-whole.jpg' },
      { id: 'g3', name: 'كفتة مشوية', price: '85 - 280', description: 'كفتة بلدي مشوية، متاحة بالوزن.', image: '/images/grill/kofta.jpg' },
      { id: 'g6', name: 'مشويات مشكلة', price: '145', description: 'ميكس جريل (كفتة، شيش، كباب).', image: '/images/grill/mix.jpg' },
    ]
  },
  {
    id: 'grill',
    title: 'المشويات',
    icon: <Flame className="w-6 h-6" />,
    items: [
      { id: 'g1', name: 'فرخة مشوية', price: '120', description: 'فرخة كاملة متبلة بخلطة الأعشاب الخاصة ومشوية على الفحم.', image: '/images/grill/chicken-whole.jpg' },
      { id: 'g2', name: 'نصف فرخة مشوية', price: '75', description: 'نصف فرخة مع الأرز والعيش.', image: '/images/grill/chicken-half.jpg' },
      { id: 'g3', name: 'كفتة مشوية', price: '85 - 280', description: 'كفتة بلدي مشوية، متاحة بالوزن.', image: '/images/grill/kofta.jpg' },
      { id: 'g4', name: 'شيش طاووق', price: '95 - 280', description: 'قطع دجاج مخلية متبلة ومشوية مع الخضروات.', image: '/images/grill/shish.jpg' },
      { id: 'g5', name: 'كبدة مشوية', price: '120 - 320', description: 'كبدة بلدي طازجة مشوية بدبس الرمان.', image: '/images/grill/liver.jpg' },
      { id: 'g6', name: 'مشويات مشكلة', price: '145', description: 'ميكس جريل (كفتة، شيش، كباب).', image: '/images/grill/mix.jpg' },
    ]
  },
  {
    id: 'meals',
    title: 'الوجبات العائلية',
    icon: <UtensilsCrossed className="w-6 h-6" />,
    items: [
      { id: 'm1', name: 'وجبة التوفير', price: '350', description: 'فرخة كاملة + 1/2 كفتة + أرز عائلي + سلطات.', image: '/images/meals/family-deal.jpg' },
      { id: 'm2', name: 'صينية الوحوش', price: '650', description: '2 كيلو مشويات مشكلة + أرز بالمكسرات + محاشي.', image: '/images/meals/monster-tray.jpg' },
    ]
  },
  {
    id: 'soups',
    title: 'الشوربة',
    icon: <Soup className="w-6 h-6" />,
    items: [
      { id: 's1', name: 'شوربة لسان عصفور', price: '25', description: 'مرقة دجاج غنية.', image: '/images/soups/orzo.jpg' },
      { id: 's2', name: 'شوربة كريمة فراخ', price: '45', description: 'كريمة غنية مع قطع الدجاج.', image: '/images/soups/cream-chicken.jpg' },
    ]
  },
  {
    id: 'salads',
    title: 'السلطات',
    icon: <LeafyGreen className="w-6 h-6" />,
    items: [
      { id: 'sal1', name: 'سلطة خضراء', price: '15', description: 'طماطم، خيار، بصل، جرجير.', image: '/images/salads/green.jpg' },
      { id: 'sal2', name: 'طحينة', price: '20', description: 'طحينة سمسم صافية.', image: '/images/salads/tahini.jpg' },
    ]
  },
  {
    id: 'desserts',
    title: 'الحلويات',
    icon: <Cherry className="w-6 h-6" />,
    items: [
      { id: 'd1', name: 'أرز باللبن', price: '30', description: 'بالفرن أو سادة.', image: '/images/desserts/rice-milk.jpg' },
      { id: 'd2', name: 'أم علي', price: '45', description: 'بالمكسرات والقشطة.', image: '/images/desserts/om-ali.jpg' },
    ]
  },
  {
    id: 'hot-drinks',
    title: 'مشروبات ساخنة',
    icon: <Coffee className="w-6 h-6" />,
    items: [
      { id: 'h1', name: 'شاي', price: '15', description: 'شاي مصري أصيل.', image: '/images/drinks/tea.jpg' },
      { id: 'h2', name: 'قهوة تركي', price: '25', description: 'بن محوج.', image: '/images/drinks/coffee.jpg' },
    ]
  },
  {
    id: 'cold-drinks',
    title: 'مشروبات باردة',
    icon: <Droplets className="w-6 h-6" />,
    items: [
      { id: 'c1', name: 'سبيرو سباتس', price: '10', description: 'دعما للمقاطعة', image: '/images/drinks/spero.jpg' },
      { id: 'c2', name: 'عصير ليمون', price: '25', description: 'فريش.', image: '/images/drinks/lemon.jpg' },
      { id: 'c3', name: 'مياه مجانية', price: '0', description: 'تصرف مجانا مع الوجبة', image: '/images/drinks/water.jpg' },
    ]
  },
];
