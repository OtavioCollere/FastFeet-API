import { InMemoryOrdersRepository } from 'test/repositories/in-memory-orders-repository';
import { InMemoryRecipientsRepository } from 'test/repositories/in-memory-recipients-repository';
import { describe, it } from 'vitest';
import { CreateOrderUseCase } from '../create-order';
import { makeRecipient } from 'test/factories/make-recipient';

let inMemoryOrdersRepository: InMemoryOrdersRepository;
let inMemoryRecipientsRepository: InMemoryRecipientsRepository;
let sut: CreateOrderUseCase;

describe('Create Order', () => {
  beforeEach(() => {
    inMemoryOrdersRepository = new InMemoryOrdersRepository();
    inMemoryRecipientsRepository = new InMemoryRecipientsRepository();
    sut = new CreateOrderUseCase(
      inMemoryOrdersRepository,
      inMemoryRecipientsRepository
    );
  });

  it('Should be able to create a new Order', async () => {
    const recipient = makeRecipient({});
    inMemoryRecipientsRepository.create(recipient);

    const result = await sut.execute({
      recipientId: recipient.id.toString()
    });

    const order = inMemoryOrdersRepository.items[0];

    expect(result.isRight()).toBe(true);
    expect(order.status).toStrictEqual('WAITING_PICKUP')
 
  });

  it('Should not be able to create order with non existent recipient id', async () => {
    const result = await sut.execute({
      recipientId : '1'
    })

    expect(result.isLeft()).toBeTruthy();
    expect(inMemoryOrdersRepository.items).toHaveLength(0);
  })

});
