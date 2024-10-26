import React, { useState } from 'react';
import { Trash2, ShoppingBag } from 'lucide-react';
import { CartItem } from '../types';
import { TableSelector } from './TableSelector';
import { OrderConfirmation } from './OrderConfirmation';
import { tables } from '../data/tables';

interface CartProps {
  items: CartItem[];
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemoveItem: (id: number) => void;
  onSubmitOrder: (tableNumber: number, notes: string) => void;
}

export const Cart: React.FC<CartProps> = ({
  items,
  onUpdateQuantity,
  onRemoveItem,
  onSubmitOrder,
}) => {
  const [selectedTable, setSelectedTable] = useState<number | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleProceedToCheckout = () => {
    if (selectedTable === null) {
      alert('Please select a table first');
      return;
    }
    setShowConfirmation(true);
  };

  const handleConfirmOrder = (notes: string) => {
    if (selectedTable === null) return;
    onSubmitOrder(selectedTable, notes);
    setShowConfirmation(false);
    setSelectedTable(null);
  };

  if (items.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <ShoppingBag size={48} className="mx-auto mb-4 text-gray-400" />
        <p className="text-gray-600">Your cart is empty</p>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Your Cart</h2>
        
        <TableSelector
          tables={tables}
          selectedTable={selectedTable}
          onSelectTable={setSelectedTable}
        />

        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-4 pb-4 border-b">
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover rounded"
              />
              <div className="flex-1">
                <h3 className="font-medium">{item.name}</h3>
                <p className="text-gray-600">${item.price.toFixed(2)}</p>
                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                    className="px-2 py-1 bg-gray-100 rounded"
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                    className="px-2 py-1 bg-gray-100 rounded"
                  >
                    +
                  </button>
                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="ml-auto text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 border-t pt-4">
          <div className="flex justify-between text-lg font-semibold">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <button 
            onClick={handleProceedToCheckout}
            className="w-full mt-4 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>

      <OrderConfirmation
        isOpen={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        onConfirm={handleConfirmOrder}
        tableNumber={selectedTable || 0}
        items={items}
        total={total}
      />
    </>
  );
};