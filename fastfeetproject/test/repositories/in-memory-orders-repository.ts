import type { OrdersRepository } from 'src/domain/store/application/repositories/orders-repository';
import type { Order } from 'src/domain/store/enterprise/entities/order';

export class InMemoryOrdersRepository implements OrdersRepository {
  public items: Order[] = [];

  async create(order: Order): Promise<Order> {
    this.items.push(order);

    return order;
  }

  async save(order: Order): Promise<Order> {
    const itemIndex = this.items.findIndex(item => item.id === order.id);

    this.items[itemIndex] = order;

    return order;
  }

  async delete(order: Order): Promise<void> {
    const itemIndex = this.items.findIndex(item => item.id === order.id);

    this.items.splice(itemIndex, 1);
  }

  async findByOrderId(orderId: string): Promise<Order | null> {
    const order = this.items.find(item => item.id.toString() === orderId);

    if (!order) {
      return null;
    }

    return order;
  }

  async findWaitingForPickupOrderById(orderId: string): Promise<Order | null> {
    const order = this.items.find(
      item =>
        item.id.toString() === orderId &&
        item.status.toString() === 'WAITING_PICKUP'
    );

    if (!order) {
      return null;
    }

    return order;
  }

  async findPickedUpOrderById(orderId: string): Promise<Order | null> {
    const order = this.items.find(
      item => item.id.toString() === orderId && item.status === 'PICKED_UP'
    );

    if (!order) {
      return null;
    }

    return order;
  }
}
