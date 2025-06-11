import { UniqueEntityID } from '@/core/entities/unique-entity-id';

import {
  Order,
  type OrderProps
} from '@/domain/store/enterprise/entities/order';
import { PrismaOrdersMapper } from '@/infra/database/prisma/mappers/prisma-orders-mapper';
import  { PrismaService } from '@/infra/database/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

export function makeOrder(
  override: Partial<OrderProps> = {},
  id?: UniqueEntityID
) {
  const order = Order.create(
    {
      recipientId: new UniqueEntityID(),
      status: 'WAITING_PICKUP',
      ...override
    },
    id
  );

  return order;
}


@Injectable()
export class OrderFactory{

  constructor(private prisma : PrismaService) {}

  async makePrismaOrder(data: Partial<OrderProps> = {}): Promise<Order> {
    const order = makeOrder(data);

    await this.prisma.order.create({
      data : PrismaOrdersMapper.toPrisma(order)
    })

    return order;
  }
}