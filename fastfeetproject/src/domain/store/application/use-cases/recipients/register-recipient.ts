

import { right, type Either } from "@/core/either";
import { Recipient } from "@/domain/store/enterprise/entities/recipient";
import { RecipientsRepository } from "../../repositories/recipient-repository";
import { Injectable } from "@nestjs/common";


export interface RegisterRecipientUseCaseRequest{
  name : string
  zipCode : string
  address : string
  district : string
  number : string
  phone : string
}

// futuramente integrar e validar se o cep realmente existe

type RegisterRecipientUseCaseResponse = Either<
null,
{
  recipient : Recipient
}
>

@Injectable()
export class RegisterRecipientUseCase{
  
  constructor(
    private recipientRepository : RecipientsRepository,
  ) {}

  async execute({name, zipCode, address, district, number, phone, } : RegisterRecipientUseCaseRequest) : Promise<RegisterRecipientUseCaseResponse> {
    
    const recipient = Recipient.create({
      name, 
      zipCode, 
      address, district, 
      number,
      phone
    })

    await this.recipientRepository.create(recipient);

    return right({
      recipient
    })
  }

}