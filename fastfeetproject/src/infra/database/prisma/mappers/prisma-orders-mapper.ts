import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Order } from "@/domain/store/enterprise/entities/order";
import type { Order as PrismaOrder, Prisma } from "generated/prisma";

export class PrismaOrdersMapper{
  static toDomain(raw : PrismaOrder) : Order {
    return Order.create({
      deliveryPersonId: raw.deliveryPersonId ? new UniqueEntityID(raw.deliveryPersonId) : undefined,
      recipientId : new UniqueEntityID(raw.recipientId),
      status : raw.status,
      withdrawalDate : raw.withdrawalDate ?? null,
      deliveryDate : raw.deliveryDate ?? undefined,
    }, new UniqueEntityID(raw.id))
  }

  static toPrisma(order : Order) : Prisma.OrderUncheckedCreateInput {
    return {
      id : order.id.toString(),
      deliveryPersonId : order.deliveryPersonId?.toString(),
      recipientId : order.recipientId.toString(),
      status : order.status,
      withdrawalDate : order.withdrawalDate ? order.withdrawalDate : null,
      deliveryDate : order.deliveryDate ? order.deliveryDate : null,
    }
  }
}