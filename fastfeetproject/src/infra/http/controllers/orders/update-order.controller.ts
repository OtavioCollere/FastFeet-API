
// import { BadRequestException, Body, ConflictException, Controller, HttpCode, NotFoundException, Post, UsePipes } from "@nestjs/common";
// import { z } from "zod";
// import { ZodValidationPipe } from "../../pipes/zod-validation-pipe";
// import { OrderIsNotAvailableToDeliverError } from "@/core/errors/errors/order-is-not-available-to-deliver-error";
// import { DeliveryPersonIsNotTheSameError } from "@/core/errors/errors/delivery-person-is-not-the-same-error";
// import { UpdateOrderUseCase } from "@/domain/store/application/use-cases/orders/update-order";

// const updateOrderBodySchema = z.object({
//   orderId: z.string().uuid().optional(),
//   deliveryPersonId: z.string().uuid().optional(),
//   recipientId:  z.string().uuid(),
//   status : z.string().optional(),
//   withdrawalDate : z.date().optional(),
//   deliveryDate : z.date().optional()
// })

// type UpdateOrderBodySchema = z.infer<typeof updateOrderBodySchema>

// @Controller('/orders')
// export class UpdateOrderController {

//   constructor(
//     private updateOrder : UpdateOrderUseCase
//   ) {}

//   @Post('/update-order')
//   // verificar se é esse codigo mesmo
//   @HttpCode(201)
//   @UsePipes(new ZodValidationPipe(updateOrderBodySchema))
//   async handle(@Body() body : UpdateOrderBodySchema) {
//     const {
//       orderId,
//       deliveryPersonId,
//       recipientId,
//       status,
//       withdrawalDate,
//       deliveryDate} = body;

//     const result = await this.updateOrder.execute({
//       orderId,
//     deliveryPersonId,
//     recipientId,
//     status,
//     withdrawalDate,
//     deliveryDate
//     })

//     if(result.isLeft()){
//       const error = result.value;

//       switch(error.constructor)
//       {
//         case OrderIsNotAvailableToDeliverError : 
//           throw new ConflictException(error.message);
//         case DeliveryPersonIsNotTheSameError:
//           throw new NotFoundException(error.message);
//         default :
//           throw new BadRequestException(error.message);
//       }

//       // verificar se precisa retornar o prisma recipient
//     }
//   }
// }