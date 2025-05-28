import { left, right, type Either } from "@/core/either";
import type { RecipientsRepository } from "../../repositories/recipient-repository";
import { Recipient } from "@/domain/store/enterprise/entities/recipient";

export class RecipientNotFoundError extends Error {
  constructor() {
    super('Recipient not found');
  }
}

export interface DeleteRecipientUseCaseRequest {
  recipientId: string;
}

export type DeleteRecipientUseCaseResponse = Either<
  RecipientNotFoundError,
  { success: true }
>;

export class DeleteRecipientUseCase {
  constructor(private recipientsRepository: RecipientsRepository) {}

  async execute({
    recipientId,
  }: DeleteRecipientUseCaseRequest): Promise<DeleteRecipientUseCaseResponse> {
    const recipient = await this.recipientsRepository.findByRecipientId(recipientId);

    if (!recipient) {
      return left(new RecipientNotFoundError());
    }

    await this.recipientsRepository.delete(recipient);

    return right({ success: true });
  }
}
