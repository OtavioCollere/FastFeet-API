import type { Order } from '../../enterprise/entities/order';

export abstract class OrdersRepository {
  // Crud methods
  abstract create(order: Order): Promise<Order>;
  abstract save(order: Order): Promise<Order>;
  abstract delete(order: Order): Promise<void>;

  abstract findByOrderId(orderId: string): Promise<Order | null>;

}
