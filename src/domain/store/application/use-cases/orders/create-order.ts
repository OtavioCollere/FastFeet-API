import { Injectable } from '@nestjs/common';
import type { OrdersRepository } from '../../repositories/orders-repository';
import type { Either } from 'src/core/either';
import type { Order } from 'src/domain/store/enterprise/entities/order';
import type { DeliveryPersonNotFoundError } from 'src/core/errors/errors/delivery-person-not-found-error';
import type { RecipientNotFoundError } from 'src/core/errors/errors/recipient-not-found-error';

interface CreateOrderUseCaseRequest {
  userId: string;
  recipientId: string;
}

type CreateOrderUseCaseResponse = Either<
  DeliveryPersonNotFoundError | RecipientNotFoundError,
  {
    order: Order;
  }
>;

// entregador precisa existis
// Destinatario precisa existir
// status inicial vai ser aguardando
// data retirada nula
// deliveryDate nula

@Injectable()
export class CreateOrderUseCase {
  constructor(private ordersRepository: OrdersRepository) {}

  async execute({
    userId,
    recipientId,
  }: CreateOrderUseCaseRequest): Promise<CreateOrderUseCaseResponse> {}
}
