import { Injectable } from '@nestjs/common';
import { DeliveryPersonNotFoundError } from 'src/core/errors/errors/delivery-person-not-found-error';
import { RecipientNotFoundError } from 'src/core/errors/errors/recipient-not-found-error';
import { OrderNotFoundError } from 'src/core/errors/errors/order-not-found-error';
import type { RecipientsRepository } from '../../repositories/recipient-repository';
import type { UsersRepository } from '../../repositories/users-repository';
import type { OrdersRepository } from '../../repositories/orders-repository';
import type { Order } from 'src/domain/store/enterprise/entities/order';
import { left, right, type Either } from 'src/core/either';

interface UpdateOrderUseCaseRequest {
  orderId : string, 
  deliveryPersonId: string; // trocar para userId
  recipientId: string;
  status?: string;
  withdrawalDate?: Date;
  deliveryDate?: Date;
}

type UpdateOrderUseCaseResponse = Either<
  DeliveryPersonNotFoundError | RecipientNotFoundError | OrderNotFoundError,
  {
    order: Order;
  }
>;

@Injectable()
export class UpdateOrderUseCase {
  constructor(
    private ordersRepository: OrdersRepository,
    private recipientRepository : RecipientsRepository,
    private usersRepository : UsersRepository
  ) {}

  async execute({
    orderId,
    deliveryPersonId,
    recipientId,
    status,
    withdrawalDate,
    deliveryDate
  }: UpdateOrderUseCaseRequest): Promise<UpdateOrderUseCaseResponse> {

    const deliveryPersonExists = await this.usersRepository.findByUserId(deliveryPersonId);

    if (!deliveryPersonExists)
    {
      return left(new DeliveryPersonNotFoundError());
    }

    const recipientExists = await this.recipientRepository.findByRecipientId(recipientId);

    if (!recipientExists)
    {
      return left(new RecipientNotFoundError());
    }

    const order = await this.ordersRepository.findByOrderId(orderId);

    if (!order) {
      return left(new OrderNotFoundError());
    }

    if (status !== undefined) {
      order.status = status;
    }
    order.withdrawalDate = withdrawalDate ?? null;
    order.deliveryDate = deliveryDate;
    order.recipientId = recipientId;
    order.deliveryPersonId = deliveryPersonId

    await this.ordersRepository.save(order);

    return right({
      order
    })

  }
}
