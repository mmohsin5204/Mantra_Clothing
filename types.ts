export interface Product {
  id: string;
  name: string;
  category: Category;
  price: number;
  image: string;
  description: string;
  sizes: string[];
  featured?: boolean;
}

export interface CartItem extends Product {
  selectedSize: string;
  quantity: number;
}

export interface User {
  email: string;
  isAdmin: boolean;
  name: string;
}

export enum Category {
  SHIRTS = 'Shirts',
  JEANS = 'Jeans',
  JACKETS = 'Jackets',
  SHOES = 'Shoes',
  ACCESSORIES = 'Accessories',
  SUITS = 'Suits'
}

export type SortOption = 'price-asc' | 'price-desc' | 'newest';
