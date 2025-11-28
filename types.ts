export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  image: string;
  rating: number;
  sales: number;
  author: string;
  tags: string[];
}

export interface SEOOptimizationResult {
  optimizedTitle: string;
  metaDescription: string;
  keywords: string[];
  socialShareText: string;
  suggestedUrlSlug: string;
}

export enum ViewState {
  HOME = 'HOME',
  DETAIL = 'DETAIL',
  SELLER_DASHBOARD = 'SELLER_DASHBOARD',
  PROFILE = 'PROFILE',
  ADMIN_DASHBOARD = 'ADMIN_DASHBOARD'
}

export type Language = 'en' | 'zh';

export type Theme = 'cyberpunk' | 'matrix' | 'crimson' | 'aurora' | 'cybersec' | 'blockchain' | 'casino' | 'stock';

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
}

export interface NavItem {
  id: string;
  label: string;
  link: string; // internal view or external url
  type: 'view' | 'external';
  view?: ViewState;
}

export type PaymentStatus = 'idle' | 'pending' | 'confirmed' | 'expired';
