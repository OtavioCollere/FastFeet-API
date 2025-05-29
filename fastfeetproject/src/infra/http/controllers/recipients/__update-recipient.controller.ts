import { BadRequestException, Body, Controller, HttpCode, Post, UsePipes } from "@nestjs/common";
import { ZodValidationPipe } from "../../pipes/zod-validation-pipe";
import {z} from 'zod';
import type { RegisterRecipientUseCase } from "@/domain/store/application/use-cases/recipients/register-recipient";
import type { UpdateRecipientUseCase } from "@/domain/store/application/use-cases/recipients/update-recipient";

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

@Controller('recipient')
export class UpdateRecipientController{

  constructor(
    private updateRecipient : UpdateRecipientUseCase
  ) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(updateRecipientBodySchema))
  async handle(@Body() body : UpdateRecipientBodySchema) {

    const { name, zipCode, address, district, number, phone } = body;

    const result = await this.updateRecipient.execute({
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

      if (!error) {
        throw new BadRequestException("An unknown error occurred.");
      }

    }

  }
}