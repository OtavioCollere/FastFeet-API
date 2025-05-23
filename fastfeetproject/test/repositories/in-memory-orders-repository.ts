import type { OrdersRepository } from "src/domain/store/application/repositories/orders-repository";
import type { Order } from "src/domain/store/enterprise/entities/order";

export class InMemoryOrdersRepository implements OrdersRepository{
  let orders : Order[] = [];
  
  create(order: Order): Promise<Order> {
    
    throw new Error("Method not implemented.");
  }
  save(order: Order): Promise<Order> {
    throw new Error("Method not implemented.");
  }
  delete(order: Order): Promise<void> {
    throw new Error("Method not implemented.");
  }
  findByOrderId(orderId: string): Promise<Order | null>  {
    throw new Error("Method not implemented.");
  }
  findWaitingForPickupOrderById(orderId: string): Promise<Order | null> {
    throw new Error("Method not implemented.");
  }
  findPickedUpOrderById(orderId: string): Promise<Order | null> {
    throw new Error("Method not implemented.");
  }
  public items : Order[] = []

  
}