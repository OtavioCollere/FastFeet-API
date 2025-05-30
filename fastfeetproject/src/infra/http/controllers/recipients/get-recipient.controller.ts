import { BadRequestException, Controller, Get, HttpCode, NotFoundException, Param,  } from "@nestjs/common";
import { RecipientNotFoundError } from "@/core/errors/errors/recipient-not-found-error";
import type { GetRecipientUseCase } from "@/domain/store/application/use-cases/recipients/get-recipient";
import { PrismaRecipientMapper } from "@/infra/database/prisma/mappers/prisma-recipient-mapper";
import { RecipientPresenter } from "../../presenter/recipient-presenter";

@Controller('/recipient')
export class UpdateRecipientController{

  constructor(
    private getRecipient : GetRecipientUseCase
  ) {}

  @Get('/:recipientId')
  @HttpCode(201)
  async handle(@Param('recipientId') recipientId : string) {

    const result = await this.getRecipient.execute({recipientId})

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

    const recipient = result.value.recipient

    return { recipient : RecipientPresenter.toHTTP(recipient) }

  }
}