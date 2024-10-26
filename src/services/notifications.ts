import { Order } from '../types';

export class NotificationService {
  private static instance: NotificationService;
  private permission: NotificationPermission = 'default';

  private constructor() {
    this.init();
  }

  static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService();
    }
    return NotificationService.instance;
  }

  private async init() {
    if ('Notification' in window) {
      this.permission = await Notification.requestPermission();
    }
  }

  async notifyNewOrder(order: Order) {
    if (this.permission === 'granted') {
      const notification = new Notification('New Order!', {
        body: `Table ${order.tableNumber} - ${order.items.length} items`,
        icon: '/notification-icon.png',
        tag: 'new-order',
      });

      notification.onclick = () => {
        window.focus();
        notification.close();
      };
    }
  }

  async notifyOrderReady(order: Order) {
    if (this.permission === 'granted') {
      new Notification('Order Ready!', {
        body: `Order for Table ${order.tableNumber} is ready to serve`,
        icon: '/notification-icon.png',
        tag: 'order-ready',
      });
    }
  }
}