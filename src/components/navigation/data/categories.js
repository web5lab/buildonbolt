import { 
  Briefcase, Cpu, Rocket, Network, 
  DollarSign, Building, Gamepad2, Dice1, ShoppingCart, 
  User, Book, Camera, Server, Globe2, MessageSquare 
} from 'lucide-react';

export const categories = [
  { id: 'featured', label: 'All', icon: Rocket, count: 50 },
  { id: 'blockchain', label: 'Blockchain', icon: Network, count: 24 },
  { id: 'ai', label: 'AI Templates', icon: Cpu, count: 15 },
  { id: 'landing-page', label: 'Landing Page', icon: Globe2, count: 18 }, 
  { id: 'portfolio', label: 'Portfolio Dashboard', icon: Briefcase, count: 6 },
  { id: 'infrastructure', label: 'Infrastructure', icon: Server, count: 13 }, 
  { id: 'game', label: 'Game', icon: Gamepad2, count: 14 },
  { id: 'real-estate', label: 'Real Estate', icon: Building, count: 9 },
  { id: 'finance', label: 'Finance', icon: DollarSign, count: 11 },
  { id: 'ecommerce', label: 'E-Commerce', icon: ShoppingCart, count: 16 },
  { id: 'social', label: 'Social Media', icon: User, count: 12 },
  { id: 'education', label: 'Education', icon: Book, count: 10 },
  { id: 'photography', label: 'Photography', icon: Camera, count: 8 },
  { id: 'chat', label: 'Chat', icon: MessageSquare, count: 21 },             
];
