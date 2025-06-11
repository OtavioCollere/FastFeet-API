import { OrdersRepository } from "@/domain/store/application/repositories/orders-repository";
import { Order } from "@/domain/store/enterprise/entities/order";

import { Injectable } from '@nestjs/common';
import { PrismaService } from "../prisma.service";
import { PrismaOrdersMapper } from "../mappers/prisma-orders-mapper";

@Injectable()
export class PrismaOrdersRepository implements OrdersRepository {
  constructor(private prisma: PrismaService) {}

  async create(order: Order): Promise<Order> {
    const data = PrismaOrdersMapper.toPrisma(order);

    await this.prisma.order.create({ data });

    return order;
  }

  async save(order: Order): Promise<Order> {
    const data = PrismaOrdersMapper.toPrisma(order);

    await this.prisma.order.update({
      where: { id: order.id.toString() },
      data,
    });

    return order;
  }

  async delete(order: Order): Promise<void> {
    await this.prisma.order.delete({
      where: { id: order.id.toString() },
    });
  }

  async findByOrderId(orderId: string): Promise<Order | null> {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
    });

    if (!order) return null;

    return PrismaOrdersMapper.toDomain(order);
  }

  async findWaitingForPickupOrderById(orderId: string): Promise<Order | null> {
    const order = await this.prisma.order.findFirst({
      where: {
        id: orderId,
        status: 'WAITING_PICKUP',
      },
    });

    if (!order) return null;

    return PrismaOrdersMapper.toDomain(order);
  }

  async findPickedUpOrderById(orderId: string): Promise<Order | null> {
    const order = await this.prisma.order.findFirst({
      where: {
        id: orderId,
        status: 'PICKED_UP',
      },
    });

    if (!order) return null;

    return PrismaOrdersMapper.toDomain(order);
  }
}
