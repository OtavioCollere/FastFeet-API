import { 
  BadRequestException, 
  Controller, 
  NotFoundException, 
  Param, 
  Post 
} from '@nestjs/common';

import { RecipientNotFoundError } from '@/core/errors/errors/recipient-not-found-error';
import type { CreateOrderUseCase } from '@/domain/store/application/use-cases/orders/create-order';

@Controller('/order')
export class CreateOrderController {
  constructor(
    private createOrder: CreateOrderUseCase
  ) {}

  @Post('/:recipientId')
  async handle(
    @Param('recipientId') recipientId : string
  ) {
    const result = await this.createOrder.execute({ recipientId });

    if (result.isLeft()) {
      const error = result.value;

      switch (error.constructor) {
        case RecipientNotFoundError:
          throw new NotFoundException(error.message);
        default:
          throw new BadRequestException(error.message);
      }
    }

    return result.value;
  }
}
