import { BadRequestException, Body, ConflictException, Controller, Delete, Get, HttpCode, NotFoundException, Param, Post, UsePipes } from "@nestjs/common";
import { OrderNotFoundError } from "@/core/errors/errors/order-not-found-error";
import type { DeleteOrderUseCase } from "@/domain/store/application/use-cases/orders/delete-order";


@Controller('/order/')
export class DeleteOrderController {

  constructor(
    private deleteOrder : DeleteOrderUseCase
  ) {}

  @Delete('/:orderId')
  async handle(
    @Param('orderId') orderId : string
  ) {

    const result = await this.deleteOrder.execute({
      orderId,
    })

    if(result.isLeft()){
      const error = result.value;

      switch(error.constructor)
      {
        case OrderNotFoundError : 
          throw new NotFoundException(error.message);
        default :
          throw new BadRequestException(error.message);
      }

    }
  }
}