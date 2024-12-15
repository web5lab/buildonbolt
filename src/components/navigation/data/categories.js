import { Code, Layers, Briefcase, Cpu, Palette, Rocket } from 'lucide-react';

export const categories = [
  { id: 'featured', label: 'Featured', icon: Rocket, count: 12 },
  { id: 'frontend', label: 'Frontend', icon: Code, count: 24 },
  { id: 'fullstack', label: 'Full Stack', icon: Layers, count: 18 },
  { id: 'enterprise', label: 'Enterprise', icon: Briefcase, count: 8 },
  { id: 'ai', label: 'AI Templates', icon: Cpu, count: 15 },
  { id: 'design', label: 'Design System', icon: Palette, count: 10 },
];