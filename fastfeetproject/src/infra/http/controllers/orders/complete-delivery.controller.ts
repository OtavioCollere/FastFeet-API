
import type { PickupOrderUseCase } from "@/domain/store/application/use-cases/orders/pickup-order";
import { BadRequestException, Body, ConflictException, Controller, HttpCode, NotFoundException, Post, UsePipes } from "@nestjs/common";
import { z } from "zod";
import { ZodValidationPipe } from "../../pipes/zod-validation-pipe";
import { OrderIsNotAvailableToPickupError } from "@/core/errors/errors/order-is-not-available-to-pickup-error";
import { DeliveryPersonNotFoundError } from "@/core/errors/errors/delivery-person-not-found-error";
import type { CompleteDeliveryUseCase } from "@/domain/store/application/use-cases/orders/complete-delivery";
import { OrderIsNotAvailableToDeliverError } from "@/core/errors/errors/order-is-not-available-to-deliver-error";
import { DeliveryPersonIsNotTheSameError } from "@/core/errors/errors/delivery-person-is-not-the-same-error";

const completeDeliveryBodySchema = z.object({
  orderId: z.string().uuid(),
  deliveryPersonId: z.string().uuid(),
})

type CompleteDeliveryBodySchema = z.infer<typeof completeDeliveryBodySchema>

@Controller('/orders')
export class CompleteDeliveryController {

  constructor(
    private completeDelivery : CompleteDeliveryUseCase
  ) {}

  @Post('/complete-delivery')
  // verificar se é esse codigo mesmo
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(completeDeliveryBodySchema))
  async handle(@Body() body : CompleteDeliveryBodySchema) {
    const {orderId, deliveryPersonId} = body;

    const result = await this.completeDelivery.execute({
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