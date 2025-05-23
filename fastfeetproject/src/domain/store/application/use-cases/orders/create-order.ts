import { Injectable } from '@nestjs/common';
import type { OrdersRepository } from '../../../../../../../../OLD_FastFeet-API/fastfeet/src/domain/store/application/repositories/orders-repository';
import { left, right, type Either } from 'src/core/either';
import { Order } from 'src/domain/store/enterprise/entities/order';
import { RecipientNotFoundError } from 'src/core/errors/errors/recipient-not-found-error';
import type { RecipientsRepository } from '../../../../../../../../OLD_FastFeet-API/fastfeet/src/domain/store/application/repositories/recipient-repository';

interface CreateOrderUseCaseRequest {
  recipientId: string;
}

type CreateOrderUseCaseResponse = Either<
  RecipientNotFoundError,
  {
    order: Order;
  }
>;

// Cria a encomenda sem o entregador
// O entregador que vai pickar a encomenda depois

@Injectable()
export class CreateOrderUseCase {
  constructor(
    private ordersRepository: OrdersRepository,
    private recipientsRepository : RecipientsRepository
  ) {}

  async execute({
    recipientId,
  }: CreateOrderUseCaseRequest): Promise<CreateOrderUseCaseResponse> {

    const recipientExists = await this.recipientsRepository.findByRecipientId(recipientId);
  
    if (!recipientExists) {
      return left(new RecipientNotFoundError());
    }

    const order = Order.create({
      recipientId,
      status : 'WAITING_PICKUP'
    })

    await this.ordersRepository.create(order);

    return right({
      order
    })
  }
}
