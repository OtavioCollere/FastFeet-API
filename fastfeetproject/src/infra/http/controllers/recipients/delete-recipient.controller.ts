import { BadRequestException, Controller, Delete, Get, HttpCode, NotFoundException, Param,  } from "@nestjs/common";
import { RecipientNotFoundError } from "@/core/errors/errors/recipient-not-found-error";
import { DeleteRecipientUseCase } from "@/domain/store/application/use-cases/recipients/delete-recipient";

@Controller('/recipient')
export class DeleteRecipientController{

  constructor(
    private deleteRecipient : DeleteRecipientUseCase
  ) {}

  @Delete('/:recipientId')
  @HttpCode(204)
  async handle(@Param('recipientId') recipientId : string) {

    const result = await this.deleteRecipient.execute({recipientId})

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