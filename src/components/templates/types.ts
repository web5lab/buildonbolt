export interface Template {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  author: string;
  techStack: string[];
  createdAt: string;
  stars: number;
  previewUrl?: string;
  status?: 'approved' | 'pending' | 'rejected' | 'draft';
}

export interface FavoriteStatus {
  favorited: boolean;
}

export type SortOption = 'newest' | 'popular';

export interface ShareResponse {
  success: boolean;
  error?: string;
}