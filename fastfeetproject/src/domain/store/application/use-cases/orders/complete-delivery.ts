import { left, right, type Either } from "src/core/either";
import { OrderIsNotAvailableToPickupError } from "src/core/errors/errors/order-is-not-available-to-pickup-error";
import type { Order } from "src/domain/store/enterprise/entities/order";
import type { OrdersRepository } from "../../repositories/orders-repository";
import { OrderIsNotAvailableToDeliverError } from "src/core/errors/errors/order-is-not-available-to-deliver-error";
import { DeliveryPersonIsNotTheSameError } from "src/core/errors/errors/delivery-person-is-not-the-same-error";


interface PickupOrderUseCaseRequest{
  orderId : string
  deliveryPersonId : string
}

type PickupOrderUseCaseResponse = Either<
  OrderIsNotAvailableToPickupError | DeliveryPersonIsNotTheSameError,
  {
    order: Order
  }
>

export class PickupOrderUseCase{

  constructor(
    private ordersRepository: OrdersRepository,
  ) {}

  async execute({orderId, deliveryPersonId} : PickupOrderUseCaseRequest) : Promise<PickupOrderUseCaseResponse> {

    const order = await this.ordersRepository.findPickedUpOrderById(orderId);

    if(!order)
    {
      return left(new OrderIsNotAvailableToDeliverError())
    }

    if (deliveryPersonId === order.deliveryPersonId.toString())
    {
      return left(new DeliveryPersonIsNotTheSameError());
    }

    order.completeDelivery();

    await this.ordersRepository.save(order);

    return right({
      order
    })

  }
} 