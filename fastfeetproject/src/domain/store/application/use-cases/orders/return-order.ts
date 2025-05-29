import { left, right, type Either } from 'src/core/either';
import type { Order } from 'src/domain/store/enterprise/entities/order';
import { OrderIsNotAvailableToReturnError } from 'src/core/errors/errors/order-is-not-available-to-return';
import type { OrdersRepository } from '../../repositories/orders-repository';
import { DeliveryPersonIsNotTheSameError } from '@/core/errors/errors/delivery-person-is-not-the-same-error';
import { Injectable } from '@nestjs/common';

interface ReturnOrderUseCaseRequest {
  orderId : string
  deliveryPersonId : string
}

type ReturnOrderUseCaseResponse = Either<
  OrderIsNotAvailableToReturnError,
  {
    order : Order
  }
>

@Injectable()
export class ReturnOrderUseCase {
  constructor(
    private ordersRepository: OrdersRepository,
  ) {}

  async execute({orderId, deliveryPersonId} : ReturnOrderUseCaseRequest) : Promise<ReturnOrderUseCaseResponse> {

    const order = await this.ordersRepository.findPickedUpOrderById(orderId);

    if(!order) {
      return left(new OrderIsNotAvailableToReturnError())
    }

    if (deliveryPersonId !== order.deliveryPersonId?.toString())
    {
      return left(new DeliveryPersonIsNotTheSameError());
    }

    order.returnOrder();

    return right({
      order
    })

  }
}