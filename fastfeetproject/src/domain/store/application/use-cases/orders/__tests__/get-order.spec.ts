import { InMemoryOrdersRepository } from 'test/repositories/in-memory-orders-repository';
import { GetOrderUseCase } from '../get-order';
import { makeOrder } from 'test/factories/make-order';
import { OrderNotFoundError } from '@/core/errors/errors/order-not-found-error';

let inMemoryOrdersRepository: InMemoryOrdersRepository;
let sut: GetOrderUseCase;

describe('Get Order', () => {
  beforeEach(() => {
    inMemoryOrdersRepository = new InMemoryOrdersRepository();
    sut = new GetOrderUseCase(inMemoryOrdersRepository);
  });

  it('should be able to get an existing order', async () => {
    const order = makeOrder();

    inMemoryOrdersRepository.create(order);

    const result = await sut.execute({
      orderId: order.id.toString(),
    });

    expect(result.isRight()).toBe(true);
    if (result.isRight()) {
      expect(result.value.order.id.toString()).toBe(order.id.toString());
      expect(result.value.order.status).toBe(order.status);
    }
  });

  it('should not be able to get a non-existent order', async () => {
    const result = await sut.execute({
      orderId: 'non-existent-id',
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(OrderNotFoundError);
  });
});
