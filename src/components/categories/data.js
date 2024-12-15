import { Code, Layers, Briefcase, Cpu, Palette } from 'lucide-react';

export const categories = [
  { 
    id: 'frontend',
    label: 'Frontend',
    icon: Code,
    count: 24,
    description: 'Beautiful UI components and layouts'
  },
  { 
    id: 'fullstack',
    label: 'Full Stack',
    icon: Layers,
    count: 18,
    description: 'Complete application solutions'
  },
  { 
    id: 'enterprise',
    label: 'Enterprise',
    icon: Briefcase,
    count: 8,
    description: 'Production-ready architectures'
  },
  { 
    id: 'ai',
    label: 'AI Templates',
    icon: Cpu,
    count: 15,
    description: 'Machine learning and AI solutions'
  },
  { 
    id: 'design',
    label: 'Design System',
    icon: Palette,
    count: 10,
    description: 'Component libraries and UI kits'
  }
];