import { RecipientsRepository } from '@/domain/store/application/repositories/recipient-repository';
import { Recipient } from '@/domain/store/enterprise/entities/recipient';

export class InMemoryRecipientsRepository implements RecipientsRepository {
  public items: Recipient[] = [];

  async create(recipient: Recipient): Promise<Recipient> {
    this.items.push(recipient);
    return recipient;
  }
  async save(recipient: Recipient): Promise<Recipient> {
    const index = this.items.findIndex(item => item.id === recipient.id);
    if (index !== -1) {
      this.items[index] = recipient;
    } else {
      this.items.push(recipient);
    }
    return recipient;
  }

  async delete(recipient: Recipient): Promise<void> {
    this.items = this.items.filter(item => item.id !== recipient.id);
  }

  async findByRecipientId(id: string): Promise<Recipient | null> {
    return this.items.find(item => item.id.toString() === id) || null;
  }
}
