export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export interface Order {
  id: string;
  tableNumber: number;
  items: CartItem[];
  status: 'pending' | 'preparing' | 'ready' | 'served';
  total: number;
  timestamp: Date;
  notes: string;
}

export interface Table {
  id: number;
  seats: number;
  status: 'available' | 'occupied';
}