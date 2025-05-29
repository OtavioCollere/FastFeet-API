
import { BadRequestException, Body, ConflictException, Controller, HttpCode, NotFoundException, Post, UsePipes } from "@nestjs/common";
import { z } from "zod";
import { ZodValidationPipe } from "../../pipes/zod-validation-pipe";
import type { UpdateOrderUseCase } from "@/domain/store/application/use-cases/orders/complete-delivery";
import { OrderIsNotAvailableToDeliverError } from "@/core/errors/errors/order-is-not-available-to-deliver-error";
import { DeliveryPersonIsNotTheSameError } from "@/core/errors/errors/delivery-person-is-not-the-same-error";

const updateOrderBodySchema = z.object({
  orderId: z.string().uuid(),
  deliveryPersonId: z.string().uuid(),
})

type UpdateOrderBodySchema = z.infer<typeof updateOrderBodySchema>

@Controller('/orders/complete-delivery')
export class UpdateOrderController {

  constructor(
    private UpdateOrder : UpdateOrderUseCase
  ) {}

  Post()
  // verificar se é esse codigo mesmo
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(updateOrderBodySchema))
  async handle(@Body() body : UpdateOrderBodySchema) {
    const {orderId, deliveryPersonId} = body;

    const result = await this.UpdateOrder.execute({
      orderId,
      deliveryPersonId
    })

    if(result.isLeft()){
      const error = result.value;

      switch(error.constructor)
      {
        case OrderIsNotAvailableToDeliverError : 
          throw new ConflictException(error.message);
        case DeliveryPersonIsNotTheSameError:
          throw new NotFoundException(error.message);
        default :
          throw new BadRequestException(error.message);
      }

      // verificar se precisa retornar o prisma recipient
    }
  }
}