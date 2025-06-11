import { Order } from "src/domain/store/enterprise/entities/order";

export abstract class OrdersRepository {
  // Crud methods
  abstract create(order: Order): Promise<Order>;
  abstract save(order: Order): Promise<Order>;
  abstract delete(order: Order): Promise<void>;

  abstract findByOrderId(orderId : string) : Promise<Order | null>
  abstract findWaitingForPickupOrderById(orderId : string) : Promise<Order | null>
  abstract findPickedUpOrderById(orderId: string): Promise<Order | null>
}
