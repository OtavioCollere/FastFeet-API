import { left, right, type Either } from 'src/core/either';
import type { Order } from 'src/domain/store/enterprise/entities/order';
import { OrderIsNotAvailableToReturnError } from 'src/core/errors/errors/order-is-not-available-to-return';
import type { OrdersRepository } from '../../repositories/orders-repository';

interface ReturnOrderUseCaseRequest {
  orderId : string
}

type ReturnOrderUseCaseResponse = Either<
  OrderIsNotAvailableToReturnError,
  {
    order : Order
  }
>

export class ReturnOrderUseCase {
  constructor(
    private ordersRepository: OrdersRepository,
  ) {}

  async execute({orderId} : ReturnOrderUseCaseRequest) : Promise<ReturnOrderUseCaseResponse> {

    const order = await this.ordersRepository.findPickedUpOrderById(orderId);

    if(!order) {
      return left(new OrderIsNotAvailableToReturnError())
    }

    order.returnOrder();

    return right({
      order
    })

  }
}