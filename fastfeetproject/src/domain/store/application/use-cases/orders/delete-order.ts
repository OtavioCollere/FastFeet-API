import { Injectable } from '@nestjs/common';
import { OrderNotFoundError } from 'src/core/errors/errors/order-not-found-error';
import type { OrdersRepository } from '../../repositories/orders-repository';
import { left, right, type Either } from 'src/core/either';

interface DeleteOrderUseCaseRequest {
  orderId : string, 
}

type DeleteOrderUseCaseResponse = Either<
  OrderNotFoundError,
  {}
>;

@Injectable()
export class DeleteOrderUseCase {
  constructor(
    private ordersRepository: OrdersRepository,
  ) {}

  async execute({
    orderId,
  }: DeleteOrderUseCaseRequest): Promise<DeleteOrderUseCaseResponse> {
    const order = await this.ordersRepository.findByOrderId(orderId);

    if (!order) {
      return left(new OrderNotFoundError());
    }

    await this.ordersRepository.delete(order)

    return right({})
  }
}
