import { UniqueEntityID } from '@/core/entities/unique-entity-id';

import {
  Order,
  type OrderProps
} from '@/domain/store/enterprise/entities/order';

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
