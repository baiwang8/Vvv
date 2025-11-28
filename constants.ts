import { Product } from './types';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    title: 'CryptoExchange Pro - White Label Solution',
    description: 'A complete cryptocurrency exchange platform with matching engine, liquidity provider integration, and admin panel. Built with Node.js and React.',
    price: 499,
    category: 'FinTech',
    image: 'https://picsum.photos/800/600?random=1',
    rating: 4.8,
    sales: 124,
    author: 'BlockMaster',
    tags: ['Crypto', 'React', 'Node.js', 'Blockchain']
  },
  {
    id: '2',
    title: 'SaaSKit - Enterprise Boilerplate',
    description: 'Jumpstart your SaaS business with this feature-rich boilerplate. Includes authentication, subscription billing (Stripe), email templates, and user dashboard.',
    price: 199,
    category: 'SaaS',
    image: 'https://picsum.photos/800/600?random=2',
    rating: 4.9,
    sales: 850,
    author: 'DevFoundry',
    tags: ['Next.js', 'Tailwind', 'Stripe', 'SaaS']
  },
  {
    id: '3',
    title: 'UnityRPG - Open World Engine',
    description: 'A massive open-world RPG template for Unity 3D. Features inventory system, combat mechanics, quest log, and NPC dialogue systems.',
    price: 89,
    category: 'Game Assets',
    image: 'https://picsum.photos/800/600?random=3',
    rating: 4.5,
    sales: 340,
    author: 'GameSmiths',
    tags: ['Unity', 'C#', '3D', 'RPG']
  },
  {
    id: '4',
    title: 'FoodDelivery UberClone',
    description: 'Full stack food delivery application consisting of User App, Driver App, Restaurant Dashboard, and Admin Panel. Flutter based.',
    price: 299,
    category: 'Mobile App',
    image: 'https://picsum.photos/800/600?random=4',
    rating: 4.2,
    sales: 56,
    author: 'AppWizard',
    tags: ['Flutter', 'Firebase', 'Mobile', 'Delivery']
  },
  {
    id: '5',
    title: 'AI Chatbot Integration Suite',
    description: 'Seamlessly integrate LLMs into your existing support workflow. Supports OpenAI, Gemini, and Claude APIs with a unified interface.',
    price: 149,
    category: 'AI Tools',
    image: 'https://picsum.photos/800/600?random=5',
    rating: 4.7,
    sales: 210,
    author: 'NeuralNets',
    tags: ['Python', 'AI', 'Chatbot', 'Support']
  },
  {
    id: '6',
    title: 'RealEstate VR Showcase',
    description: 'Virtual reality property tour system compatible with WebXR. Allow clients to walk through properties directly from their browser.',
    price: 349,
    category: 'Real Estate',
    image: 'https://picsum.photos/800/600?random=6',
    rating: 4.9,
    sales: 89,
    author: 'PropTechLabs',
    tags: ['Three.js', 'WebXR', 'Real Estate', 'VR']
  }
];
