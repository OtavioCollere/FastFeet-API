
import { BadRequestException, Body, ConflictException, Controller, HttpCode, Post, UsePipes } from "@nestjs/common";
import { z } from "zod";
import { ZodValidationPipe } from "../../pipes/zod-validation-pipe";
import { ReturnOrderUseCase } from "@/domain/store/application/use-cases/orders/return-order";
import { OrderIsNotAvailableToReturnError } from "@/core/errors/errors/order-is-not-available-to-return";

const returnOrderBodySchema = z.object({
  orderId: z.string().uuid(),
  deliveryPersonId: z.string().uuid(),
})

type returnOrderBodySchema = z.infer<typeof returnOrderBodySchema>

@Controller('/orders/')
export class ReturnOrderController {

  constructor(
    private returnOrder : ReturnOrderUseCase
  ) {}

  @Post('/return-order')
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(returnOrderBodySchema))
  async handle(@Body() body : returnOrderBodySchema) {
    const {orderId, deliveryPersonId} = body;

    const result = await this.returnOrder.execute({
      orderId,
      deliveryPersonId
    })

    if(result.isLeft()){
      const error = result.value;

      switch(error.constructor)
      {
        case OrderIsNotAvailableToReturnError : 
          throw new ConflictException(error.message);
        default :
          throw new BadRequestException(error.message);
      }

      // verificar se precisa retornar o prisma recipient
    }
  }
}