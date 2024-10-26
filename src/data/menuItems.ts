import { MenuItem } from '../types';

export const categories = [
  'all',
  'starters',
  'main',
  'desserts',
  'drinks',
] as const;

export const menuItems: MenuItem[] = [
  {
    id: 1,
    name: 'Classic Burger',
    description: 'Juicy beef patty with fresh vegetables',
    price: 12.99,
    category: 'main',
    image:
      'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=300',
  },
  {
    id: 2,
    name: 'Caesar Salad',
    description: 'Crispy romaine lettuce with parmesan',
    price: 8.99,
    category: 'starters',
    image:
      'https://images.unsplash.com/photo-1546793665-c74683f339c1?auto=format&fit=crop&w=300',
  },
  {
    id: 3,
    name: 'Chocolate Cake',
    description: 'Rich chocolate layer cake',
    price: 6.99,
    category: 'desserts',
    image:
      'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=300',
  },
  {
    id: 4,
    name: 'Iced Tea',
    description: 'Fresh brewed and chilled',
    price: 3.99,
    category: 'drinks',
    image:
      'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=300',
  },
];
