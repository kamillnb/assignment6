export type Category = 'Starters' | 'Mains' | 'Grill' | 'Pasta' | 'Desserts' | 'Wine';

export interface MenuItem {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  category: Category | string;
  favourite?: boolean;
}
