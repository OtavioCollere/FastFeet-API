import { Injectable } from '@nestjs/common';
import type { OrdersRepository } from '../../repositories/orders-repository';
import { left, right, type Either } from 'src/core/either';
import type { Order } from 'src/domain/store/enterprise/entities/order';
import { OrderNotFoundError } from 'src/core/errors/errors/order-not-found-error';

interface FindNearbyOrdersUseCaseRequest {
  orderId : string, 
}

type FindNearbyOrdersUseCaseResponse = Either<
  OrderNotFoundError,
  {}
>;

@Injectable()
export class FindNearbyOrdersUseCase {
  constructor(
    private ordersRepository: OrdersRepository,
  ) {}

  async execute({
    orderId,
  }: FindNearbyOrdersUseCaseRequest): Promise<FindNearbyOrdersUseCaseResponse> {
    
    // recebe localizacao

    // pesquisa no banco 

    return right({})

  }
}
