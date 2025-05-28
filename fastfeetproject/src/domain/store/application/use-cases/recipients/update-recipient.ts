import { left, right, type Either } from "@/core/either";
import type { RecipientsRepository } from "../../repositories/recipient-repository";
import { Recipient } from "@/domain/store/enterprise/entities/recipient";

export class RecipientNotFoundError extends Error {
  constructor() {
    super('Recipient not found');
  }
}

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
