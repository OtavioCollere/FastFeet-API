import { left, right, type Either } from "src/core/either";
import { Order } from "src/domain/store/enterprise/entities/order";
import { OrdersRepository } from "../../repositories/orders-repository";
import { OrderIsNotAvailableToDeliverError } from "src/core/errors/errors/order-is-not-available-to-deliver-error";
import { DeliveryPersonIsNotTheSameError } from "src/core/errors/errors/delivery-person-is-not-the-same-error";
import { Injectable } from "@nestjs/common";


interface CompleteDeliveryUseCaseRequest{
  orderId : string
  deliveryPersonId : string
}

type CompleteDeliveryUseCaseResponse = Either<
  OrderIsNotAvailableToDeliverError | DeliveryPersonIsNotTheSameError,
  {
    order: Order
  }
>

@Injectable()
export class CompleteDeliveryUseCase{

  constructor(
    private ordersRepository: OrdersRepository,
  ) {}

  async execute({orderId, deliveryPersonId} : CompleteDeliveryUseCaseRequest) : Promise<CompleteDeliveryUseCaseResponse> {

    const order = await this.ordersRepository.findPickedUpOrderById(orderId);

    if(!order)
    {
      return left(new OrderIsNotAvailableToDeliverError())
    }

    if (deliveryPersonId !== order.deliveryPersonId?.toString())
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