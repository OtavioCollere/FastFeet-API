import { left, right, type Either } from "@/core/either";
import { RecipientsRepository } from "../../repositories/recipient-repository";
import { RecipientNotFoundError } from "@/core/errors/errors/recipient-not-found-error";
import { Injectable } from "@nestjs/common";

export interface DeleteRecipientUseCaseRequest {
  recipientId: string;
}

export type DeleteRecipientUseCaseResponse = Either<
  RecipientNotFoundError,
  { success: true }
>;

@Injectable()
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
