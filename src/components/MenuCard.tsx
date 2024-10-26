import React from 'react';
import { MenuItem } from '../types';
import { Plus } from 'lucide-react';

interface MenuCardProps {
  item: MenuItem;
  onAddToCart: (item: MenuItem) => void;
}

export const MenuCard: React.FC<MenuCardProps> = ({ item, onAddToCart }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img
        src={item.image}
        alt={item.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold">{item.name}</h3>
            <p className="text-gray-600 text-sm mt-1">{item.description}</p>
          </div>
          <span className="text-lg font-bold">${item.price.toFixed(2)}</span>
        </div>
        <button
          onClick={() => onAddToCart(item)}
          className="mt-4 w-full flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={18} />
          Add to Order
        </button>
      </div>
    </div>
  );
};