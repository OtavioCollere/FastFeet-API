import type { Recipient } from '../../enterprise/entities/recipient';

export abstract class RecipientsRepository {
  // Crud methods
  abstract create(recipient: Recipient): Promise<Recipient>;
  abstract save(recipient: Recipient): Promise<Recipient>;
  abstract delete(recipient: Recipient): Promise<void>;

  // Finds
  abstract findByRecipientId(id : string) : Promise<Recipient | null>

}
