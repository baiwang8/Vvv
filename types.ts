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
  PROFILE = 'PROFILE'
}

export type Language = 'en' | 'zh';