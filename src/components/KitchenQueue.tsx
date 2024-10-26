import React from 'react';
import { Clock, CheckCircle } from 'lucide-react';
import { Order } from '../types';

interface KitchenQueueProps {
  orders: Order[];
  onUpdateOrderStatus: (orderId: string, status: Order['status']) => void;
}

export const KitchenQueue: React.FC<KitchenQueueProps> = ({
  orders,
  onUpdateOrderStatus,
}) => {
  const pendingOrders = orders.filter(order => order.status === 'pending' || order.status === 'preparing');

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Kitchen Queue</h2>
      {pendingOrders.length === 0 ? (
        <p className="text-gray-500 text-center py-4">No pending orders</p>
      ) : (
        <div className="space-y-4">
          {pendingOrders.map((order) => (
            <div
              key={order.id}
              className="border rounded-lg p-4 bg-gray-50"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-semibold">Table {order.tableNumber}</h3>
                  <p className="text-sm text-gray-500">
                    <Clock size={14} className="inline mr-1" />
                    {new Date(order.timestamp).toLocaleTimeString()}
                  </p>
                </div>
                <div className="flex gap-2">
                  {order.status === 'pending' && (
                    <button
                      onClick={() => onUpdateOrderStatus(order.id, 'preparing')}
                      className="px-3 py-1 text-sm bg-blue-600 text-white rounded-full"
                    >
                      Start Preparing
                    </button>
                  )}
                  {order.status === 'preparing' && (
                    <button
                      onClick={() => onUpdateOrderStatus(order.id, 'ready')}
                      className="px-3 py-1 text-sm bg-green-600 text-white rounded-full"
                    >
                      Mark Ready
                    </button>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                {order.items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="font-medium">{item.quantity}x {item.name}</span>
                  </div>
                ))}
              </div>
              {order.notes && (
                <div className="mt-3 text-sm bg-yellow-50 p-2 rounded border border-yellow-100">
                  <span className="font-medium">Notes:</span> {order.notes}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};