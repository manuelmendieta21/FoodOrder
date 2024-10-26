import { useState, useEffect } from 'react';
import { Order } from '../types';
import { OrderQueue } from '../services/orderQueue';
import { NotificationService } from '../services/notifications';

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  
  useEffect(() => {
    const orderQueue = OrderQueue.getInstance();
    const notifications = NotificationService.getInstance();
    
    const unsubscribe = orderQueue.subscribe((updatedOrders) => {
      setOrders(updatedOrders);
    });

    return () => unsubscribe();
  }, []);

  const addOrder = (order: Order) => {
    const orderQueue = OrderQueue.getInstance();
    const notifications = NotificationService.getInstance();
    
    orderQueue.addOrder(order);
    notifications.notifyNewOrder(order);
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    const orderQueue = OrderQueue.getInstance();
    const notifications = NotificationService.getInstance();
    
    orderQueue.updateOrderStatus(orderId, status);
    
    if (status === 'ready') {
      const order = orders.find(o => o.id === orderId);
      if (order) {
        notifications.notifyOrderReady(order);
      }
    }
  };

  return {
    orders,
    addOrder,
    updateOrderStatus,
  };
}