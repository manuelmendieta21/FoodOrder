import React, { useState } from 'react';
import { ShoppingBag, ChevronUp, ChevronDown } from 'lucide-react';
import { CartItem } from '../types';
import { OrderConfirmation } from './OrderConfirmation';

interface CartBarProps {
  items: CartItem[];
  selectedTable: number | null;
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemoveItem: (id: number) => void;
  onSubmitOrder: (notes: string) => void;
}

export const CartBar: React.FC<CartBarProps> = ({
  items,
  selectedTable,
  onUpdateQuantity,
  onRemoveItem,
  onSubmitOrder,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (totalItems === 0) return null;

  return (
    <>
      <div className="fixed top-16 left-0 right-0 bg-white shadow-md z-10">
        <div className="max-w-7xl mx-auto">
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <ShoppingBag className="text-blue-600" size={24} />
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                </div>
                <div>
                  <span className="font-medium">Table {selectedTable}</span>
                  <span className="mx-2">•</span>
                  <span className="font-bold">${totalPrice.toFixed(2)}</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setShowConfirmation(true)}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                >
                  Place Order
                </button>
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  {isExpanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                </button>
              </div>
            </div>

            {isExpanded && (
              <div className="mt-4 space-y-4 border-t pt-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-gray-600">${item.price.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        className="px-2 py-1 bg-gray-100 rounded"
                      >
                        -
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="px-2 py-1 bg-gray-100 rounded"
                      >
                        +
                      </button>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="ml-2 text-red-500 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <OrderConfirmation
        isOpen={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        onConfirm={onSubmitOrder}
        tableNumber={selectedTable || 0}
        items={items}
        total={totalPrice}
      />
    </>
  );
};