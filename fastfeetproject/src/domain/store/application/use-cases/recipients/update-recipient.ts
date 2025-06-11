import { left, right, type Either } from "@/core/either";
import { RecipientsRepository } from "../../repositories/recipient-repository";
import { Recipient } from "@/domain/store/enterprise/entities/recipient";
import { RecipientNotFoundError } from "@/core/errors/errors/recipient-not-found-error";
import { Injectable } from "@nestjs/common";

export interface UpdateRecipientUseCaseRequest {
  recipientId: string;
  name?: string;
  zipCode?: string;
  address?: string;
  district?: string;
  number?: string;
  phone?: string;
}

export type UpdateRecipientUseCaseResponse = Either<
  RecipientNotFoundError,
  { recipient: Recipient }
>;

@Injectable()
export class UpdateRecipientUseCase {
  constructor(private recipientsRepository: RecipientsRepository) {}

  async execute({
    recipientId,
    name,
    zipCode,
    address,
    district,
    number,
    phone,
  }: UpdateRecipientUseCaseRequest): Promise<UpdateRecipientUseCaseResponse> {
    const recipient = await this.recipientsRepository.findByRecipientId(recipientId);

    if (!recipient) {
      return left(new RecipientNotFoundError());
    }

    if (name) recipient.name = name;
    if (zipCode) recipient.zipCode = zipCode;
    if (address) recipient.address = address;
    if (district) recipient.district = district;
    if (number) recipient.number = number;
    if (phone) recipient.phone = phone;

    await this.recipientsRepository.save(recipient);

    return right({ recipient });
  }
}
