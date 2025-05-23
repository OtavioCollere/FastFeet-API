import { Injectable } from '@nestjs/common';
import { OrderNotFoundError } from 'src/core/errors/errors/order-not-found-error';
import type { OrdersRepository } from '../../repositories/orders-repository';
import { left, right, type Either } from 'src/core/either';
import type { Order } from 'src/domain/store/enterprise/entities/order';

interface GetOrderUseCaseRequest {
  orderId : string, 
}

type GetOrderUseCaseResponse = Either<
  OrderNotFoundError,
  {
    order: Order;
  }
>;

@Injectable()
export class GetOrderUseCase {
  constructor(
    private ordersRepository: OrdersRepository,
  ) {}

  async execute({
    orderId,
  }: GetOrderUseCaseRequest): Promise<GetOrderUseCaseResponse> {
    const order = await this.ordersRepository.findByOrderId(orderId);

    if (!order) {
      return left(new OrderNotFoundError());
    }

    return right({
      order
    })

  }
}
