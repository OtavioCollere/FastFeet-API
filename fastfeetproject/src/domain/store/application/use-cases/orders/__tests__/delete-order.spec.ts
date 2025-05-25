import { InMemoryOrdersRepository } from 'test/repositories/in-memory-orders-repository';
import { DeleteOrderUseCase } from '../delete-order';
import { makeOrder } from 'test/factories/make-order';
import { OrderNotFoundError } from '@/core/errors/errors/order-not-found-error';

let inMemoryOrdersRepository: InMemoryOrdersRepository;
let sut: DeleteOrderUseCase;

describe('Delete Order', () => {
  beforeEach(() => {
    inMemoryOrdersRepository = new InMemoryOrdersRepository();
    sut = new DeleteOrderUseCase(inMemoryOrdersRepository);
  });

  it('should be able to delete an existing order', async () => {
    const order = makeOrder();

    inMemoryOrdersRepository.create(order);

    const result = await sut.execute({
      orderId: order.id.toString(),
    });

    expect(result.isRight()).toBe(true);

    // Verifica que a ordem não existe mais no repositório
    const findOrder = await inMemoryOrdersRepository.findByOrderId(order.id.toString());
    expect(findOrder).toBeNull();
  });

  it('should not be able to delete a non-existent order', async () => {
    const result = await sut.execute({
      orderId: 'non-existent-id',
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(OrderNotFoundError);
  });
});
