import React, { useState } from 'react';
import { X } from 'lucide-react';
import { CartItem } from '../types';

interface OrderConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (notes: string) => void;
  tableNumber: number;
  items: CartItem[];
  total: number;
}

export const OrderConfirmation: React.FC<OrderConfirmationProps> = ({
  isOpen,
  onClose,
  onConfirm,
  tableNumber,
  items,
  total,
}) => {
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Confirm Order</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <div className="mb-4">
          <h3 className="font-medium mb-2">Table {tableNumber}</h3>
          <div className="space-y-2">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span>{item.quantity}x {item.name}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="border-t pt-2 font-semibold flex justify-between">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
            Special Instructions
          </label>
          <textarea
            id="notes"
            rows={3}
            className="w-full border rounded-lg p-2 text-sm"
            placeholder="Any special requests or allergies?"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm(notes)}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Confirm Order
          </button>
        </div>
      </div>
    </div>
  );
};