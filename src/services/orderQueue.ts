import { Order } from '../types';

export class OrderQueue {
  private static instance: OrderQueue;
  private queue: Order[] = [];
  private subscribers: ((orders: Order[]) => void)[] = [];

  private constructor() {}

  static getInstance(): OrderQueue {
    if (!OrderQueue.instance) {
      OrderQueue.instance = new OrderQueue();
    }
    return OrderQueue.instance;
  }

  addOrder(order: Order) {
    this.queue.push(order);
    this.notifySubscribers();
  }

  updateOrderStatus(orderId: string, status: Order['status']) {
    this.queue = this.queue.map(order =>
      order.id === orderId ? { ...order, status } : order
    );
    this.notifySubscribers();
  }

  getOrders(): Order[] {
    return [...this.queue];
  }

  subscribe(callback: (orders: Order[]) => void) {
    this.subscribers.push(callback);
    return () => {
      this.subscribers = this.subscribers.filter(sub => sub !== callback);
    };
  }

  private notifySubscribers() {
    this.subscribers.forEach(callback => callback(this.getOrders()));
  }
}