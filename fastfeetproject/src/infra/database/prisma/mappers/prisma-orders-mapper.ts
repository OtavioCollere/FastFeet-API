import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Order } from "@/domain/store/enterprise/entities/order";
import type { Recipient } from "@/domain/store/enterprise/entities/recipient";


export class PrismaOrdersMapper{
  static toDomain(raw : Order /* recipient do prisma */) : Order {
    return Order.create({
      deliveryPersonId : raw.deliveryPersonId?.toString(),
      recipientId,
      status,
      withdrawalDate,
      deliveryDate,
    }, new UniqueEntityID(raw.id))
  }
}