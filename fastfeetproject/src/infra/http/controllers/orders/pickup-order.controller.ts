import type { PickupOrderUseCase } from "@/domain/store/application/use-cases/orders/pickup-order";
import { BadRequestException, Body, ConflictException, Controller, HttpCode, NotFoundException, Post, UsePipes } from "@nestjs/common";
import { z } from "zod";
import { ZodValidationPipe } from "../../pipes/zod-validation-pipe";
import { OrderIsNotAvailableToPickupError } from "@/core/errors/errors/order-is-not-available-to-pickup-error";
import { DeliveryPersonNotFoundError } from "@/core/errors/errors/delivery-person-not-found-error";

const pickupOrderBodySchema = z.object({
  orderId: z.string().uuid(),
  deliveryPersonId: z.string().uuid(),
})

type PickupOrderBodySchema = z.infer<typeof pickupOrderBodySchema>

@Controller('/orders/pickup')
export class PickUpOrderController {

  constructor(
    private pickupOrder : PickupOrderUseCase
  ) {}

  Post()
  // verificar se é esse codigo mesmo
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(pickupOrderBodySchema))
  async handle(@Body() body : PickupOrderBodySchema) {
    const {orderId, deliveryPersonId} = body;

    const result = await this.pickupOrder.execute({
      orderId,
      deliveryPersonId
    })

    if(result.isLeft()){
      const error = result.value;

      switch(error.constructor)
      {
        case OrderIsNotAvailableToPickupError : 
          throw new ConflictException(error.message);
        case DeliveryPersonNotFoundError:
          throw new NotFoundException(error.message);
        default :
          throw new BadRequestException(error.message);
      }

      // verificar se precisa retornar o prisma recipient
    }
  }
}