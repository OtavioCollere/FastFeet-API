import { BadRequestException, Controller, Get, HttpCode, NotFoundException, Param,  } from "@nestjs/common";
import { RecipientNotFoundError } from "@/core/errors/errors/recipient-not-found-error";
import { GetRecipientUseCase } from "@/domain/store/application/use-cases/recipients/get-recipient";
import { RecipientPresenter } from "../../presenter/recipient-presenter";

@Controller('/recipients')
export class GetRecipientController{

  constructor(
    private getRecipient : GetRecipientUseCase
  ) {}

  @Get('/:recipientId')
  @HttpCode(200)
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