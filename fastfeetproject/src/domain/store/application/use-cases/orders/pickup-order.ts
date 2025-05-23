import { left, right, type Either } from "src/core/either";
import { DeliveryPersonNotFoundError } from "src/core/errors/errors/delivery-person-not-found-error";
import type { Order } from "src/domain/store/enterprise/entities/order";
import type { OrdersRepository } from "../../repositories/orders-repository";
import type { UsersRepository } from "../../repositories/users-repository";
import { OrderNotFoundError } from "src/core/errors/errors/order-not-found-error";
import { OrderIsNotAvailableToPickupError } from "src/core/errors/errors/order-is-not-available-to-pickup-error";

interface PickupOrderUseCaseRequest{
    orderId : string
    deliveryPersonId : string
}

type PickupOrderUseCaseResponse = Either<
  OrderIsNotAvailableToPickupError | DeliveryPersonNotFoundError,
  {
    order: Order
  }
>

export class PickupOrderUseCase{

  constructor(
    private ordersRepository: OrdersRepository,
    private usersRepository: UsersRepository
  ) {}

  async execute({orderId, deliveryPersonId} : PickupOrderUseCaseRequest) : Promise<PickupOrderUseCaseResponse> {
    
    const order = await this.ordersRepository.findWaitingForPickupOrderById(orderId);

    if(!order)
    {
      return left(new OrderIsNotAvailableToPickupError());
    }

    const deliveryPersonExists = await this.usersRepository.findByUserId(deliveryPersonId);
    
    if(!deliveryPersonExists)
    {
      return left(new DeliveryPersonNotFoundError());
    }

    order.pickup(deliveryPersonId);
    
    await this.ordersRepository.save(order);

    return right({
      order
    })

  }
}