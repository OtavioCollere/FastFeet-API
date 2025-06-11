import { BadRequestException, Body, ConflictException, Controller, Get, HttpCode, NotFoundException, Param, Post, UsePipes } from "@nestjs/common";
import { OrderNotFoundError } from "@/core/errors/errors/order-not-found-error";
import { GetOrderUseCase } from "@/domain/store/application/use-cases/orders/get-order";


@Controller('/order')
export class GetOrderController {

  constructor(
    private getOrder : GetOrderUseCase
  ) {}

  @Get('/:orderId')
  async handle(
    @Param('orderId') orderId : string
  ) {

    const result = await this.getOrder.execute({
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

      // verificar se precisa retornar o prisma recipient
    }
  }
}