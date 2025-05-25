import { InMemoryOrdersRepository } from 'test/repositories/in-memory-orders-repository';
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository';
import { InMemoryRecipientsRepository } from 'test/repositories/in-memory-recipients-repository';
import { UpdateOrderUseCase } from '../update-order';
import { makeOrder } from 'test/factories/make-order';
import { makeUser } from 'test/factories/make-user';
import { makeRecipient } from 'test/factories/make-recipient';
import { DeliveryPersonNotFoundError } from '@/core/errors/errors/delivery-person-not-found-error';
import { RecipientNotFoundError } from '@/core/errors/errors/recipient-not-found-error';
import { OrderNotFoundError } from '@/core/errors/errors/order-not-found-error';

let inMemoryOrdersRepository: InMemoryOrdersRepository;
let inMemoryUsersRepository: InMemoryUsersRepository;
let inMemoryRecipientsRepository: InMemoryRecipientsRepository;
let sut: UpdateOrderUseCase;

describe('Update Order', () => {
  beforeEach(() => {
    inMemoryOrdersRepository = new InMemoryOrdersRepository();
    inMemoryUsersRepository = new InMemoryUsersRepository();
    inMemoryRecipientsRepository = new InMemoryRecipientsRepository();
    sut = new UpdateOrderUseCase(
      inMemoryOrdersRepository,
      inMemoryRecipientsRepository,
      inMemoryUsersRepository
    );
  });

  it('should be able to update an order', async () => {
    const order = makeOrder();
    const deliveryPerson = makeUser({});
    const recipient = makeRecipient({});

    inMemoryOrdersRepository.create(order);
    inMemoryUsersRepository.create(deliveryPerson);
    inMemoryRecipientsRepository.create(recipient);

    const result = await sut.execute({
      orderId: order.id.toString(),
      deliveryPersonId: deliveryPerson.id.toString(),
      recipientId: recipient.id.toString(),
      status: 'DELIVERED',
      withdrawalDate: new Date(),
      deliveryDate: new Date(),
    });

    expect(result.isRight()).toBe(true);
    if (result.isRight()) {
      expect(result.value.order.status).toBe('DELIVERED');
      expect(result.value.order.deliveryPersonId).toBe(deliveryPerson.id.toString());
      expect(result.value.order.recipientId.toString()).toBe(recipient.id.toString());
      expect(result.value.order.withdrawalDate).toBeInstanceOf(Date);
      expect(result.value.order.deliveryDate).toBeInstanceOf(Date);
    }
  });

  it('should not be able to update an order with non-existent delivery person', async () => {
    const order = makeOrder();
    const recipient = makeRecipient({});

    inMemoryOrdersRepository.create(order);
    inMemoryRecipientsRepository.create(recipient);

    const result = await sut.execute({
      orderId: order.id.toString(),
      deliveryPersonId: 'non-existent-id',
      recipientId: recipient.id.toString(),
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(DeliveryPersonNotFoundError);
  });

  it('should not be able to update an order with non-existent recipient', async () => {
    const order = makeOrder();
    const deliveryPerson = makeUser({});

    inMemoryOrdersRepository.create(order);
    inMemoryUsersRepository.create(deliveryPerson);

    const result = await sut.execute({
      orderId: order.id.toString(),
      deliveryPersonId: deliveryPerson.id.toString(),
      recipientId: 'non-existent-id',
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(RecipientNotFoundError);
  });

  it('should not be able to update a non-existent order', async () => {
    const deliveryPerson = makeUser({});
    const recipient = makeRecipient({});

    inMemoryUsersRepository.create(deliveryPerson);
    inMemoryRecipientsRepository.create(recipient);

    const result = await sut.execute({
      orderId: 'non-existent-id',
      deliveryPersonId: deliveryPerson.id.toString(),
      recipientId: recipient.id.toString(),
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(OrderNotFoundError);
  });
});
