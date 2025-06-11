import { left, right, type Either } from "@/core/either";
import { RecipientsRepository } from "../../repositories/recipient-repository";
import { Recipient } from "@/domain/store/enterprise/entities/recipient";
import { RecipientNotFoundError } from "@/core/errors/errors/recipient-not-found-error";
import { Injectable } from "@nestjs/common";

export interface GetRecipientUseCaseRequest {
  recipientId: string;
}

export type GetRecipientUseCaseResponse = Either<
  RecipientNotFoundError,
  { recipient: Recipient }
>;

@Injectable()
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
