import { BadRequestException, Body, Controller, HttpCode, Post, UsePipes } from "@nestjs/common";
import { ZodValidationPipe } from "../../pipes/zod-validation-pipe";
import {z} from 'zod';
import { E } from "@faker-js/faker/dist/airline-BUL6NtOJ";
import type { RegisterRecipientUseCase } from "@/domain/store/application/use-cases/recipients/register-recipient";

export const registerRecipientBodySchema = z.object({
  name : z.string(),
  zipCode : z.string().max(11),
  address : z.string(),
  district : z.string(),
  number : z.string(),
  phone : z.string().max(11)
})

type RegisterRecipientBodySchema = z.infer<typeof registerRecipientBodySchema>;

@Controller('recipient')
export class RegisterRecipientController{

  constructor(
    private registerRecipient : RegisterRecipientUseCase
  ) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(registerRecipientBodySchema))
  async handle(@Body() body : RegisterRecipientBodySchema) {

    const { name, zipCode, address, district, number, phone } = body;

    const result = await this.registerRecipient.execute({
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