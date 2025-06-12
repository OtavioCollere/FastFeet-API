import { BadRequestException, Body, Controller, HttpCode, NotFoundException, Patch, Post, UsePipes } from "@nestjs/common";
import { ZodValidationPipe } from "../../pipes/zod-validation-pipe";
import {z} from 'zod';
import { UpdateRecipientUseCase } from "@/domain/store/application/use-cases/recipients/update-recipient";
import { RecipientNotFoundError } from "@/core/errors/errors/recipient-not-found-error";

const updateRecipientBodySchema = z.object({
  recipientId : z.string(),
  name : z.string().optional(),
  zipCode : z.string().max(11).optional(),
  address : z.string().optional(),
  district : z.string().optional(),
  number : z.string().optional(),
  phone : z.string().max(11).optional()
})

type UpdateRecipientBodySchema = z.infer<typeof updateRecipientBodySchema>;

@Controller('/recipients')
export class UpdateRecipientController{

  constructor(
    private updateRecipient : UpdateRecipientUseCase
  ) {}

  @Patch()
  @HttpCode(200)
  @UsePipes(new ZodValidationPipe(updateRecipientBodySchema))
  async handle(@Body() body : UpdateRecipientBodySchema) {

    const { recipientId, name, zipCode, address, district, number, phone } = body;

    const result = await this.updateRecipient.execute({
      recipientId,
      name, 
      zipCode,
      address,
      district,
      number,
      phone
    })

    if (result.isLeft())
    {
      const error = result.value;

      switch(error.constructor)
      {
        case RecipientNotFoundError :
          throw new NotFoundException(error.message);
        default : 
          throw new BadRequestException();
      }

    }

  }
}