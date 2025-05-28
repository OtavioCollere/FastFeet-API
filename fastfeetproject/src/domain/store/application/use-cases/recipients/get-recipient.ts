import { left, right, type Either } from "@/core/either";
import type { RecipientsRepository } from "../../repositories/recipient-repository";
import { Recipient } from "@/domain/store/enterprise/entities/recipient";

export class RecipientNotFoundError extends Error {
  constructor() {
    super('Recipient not found');
  }
}

export interface GetRecipientUseCaseRequest {
  recipientId: string;
}

export type GetRecipientUseCaseResponse = Either<
  RecipientNotFoundError,
  { recipient: Recipient }
>;

export class GetRecipientUseCase {
  constructor(private recipientsRepository: RecipientsRepository) {}

  async execute({
    recipientId,
  }: GetRecipientUseCaseRequest): Promise<GetRecipientUseCaseResponse> {
    const recipient = await this.recipientsRepository.findByRecipientId(recipientId);

    if (!recipient) {
      return left(new RecipientNotFoundError());
    }

    return right({ recipient });
  }
}
