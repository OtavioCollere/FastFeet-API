import type { OrdersRepository } from "src/domain/store/application/repositories/orders-repository";
import type { Order } from "src/domain/store/enterprise/entities/order";

export class InMemoryOrdersRepository implements OrdersRepository{
  public items : Order[] = [];
}