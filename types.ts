import React from 'react';

export interface MenuItemType {
  id: string;
  name: string;
  price: string; // Using string to handle ranges like "85-280" or fixed "120"
  description?: string;
  image: string;
}

export interface MenuCategory {
  id: string;
  title: string;
  icon: React.ReactNode;
  items: MenuItemType[];
}

export interface CartItem extends MenuItemType {
  cartId: string;
  quantity: number;
  note?: string;
}