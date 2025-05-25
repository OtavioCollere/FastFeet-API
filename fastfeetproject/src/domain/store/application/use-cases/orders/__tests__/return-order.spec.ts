import { InMemoryOrdersRepository } from "test/repositories/in-memory-orders-repository"
import { makeOrder } from "test/factories/make-order";
import { makeUser } from "test/factories/make-user";
import { ReturnOrderUseCase } from "../return-order";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { OrderIsNotAvailableToReturnError } from "@/core/errors/errors/order-is-not-available-to-return";
import { DeliveryPersonIsNotTheSameError } from "@/core/errors/errors/delivery-person-is-not-the-same-error";


let inMemoryOrdersRepository : InMemoryOrdersRepository;
let sut : ReturnOrderUseCase

describe('PickUp Order', () => {

  beforeEach(() => {
    inMemoryOrdersRepository = new InMemoryOrdersRepository();
    sut = new ReturnOrderUseCase(inMemoryOrdersRepository);
  })

  it('should be able to return order', async () => {

    const order = makeOrder({
      status : 'PICKED_UP',
      deliveryPersonId : new UniqueEntityID('1')
    });

    inMemoryOrdersRepository.create(order);

    const result = await sut.execute({
      orderId : order.id.toString(),
      deliveryPersonId : '1'
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryOrdersRepository.items[0].status).toBe('WAITING_PICKUP');
    expect(inMemoryOrdersRepository.items[0].withdrawalDate).toBe(undefined)
    
  })

  it('should not be able to return order', async () => {

    const order = makeOrder({
      status : 'WAITING_PICKUP',
      deliveryPersonId : new UniqueEntityID('1')
    });

    inMemoryOrdersRepository.create(order);

    const result = await sut.execute({
      orderId : order.id.toString(),
      deliveryPersonId : '1'
    })

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(OrderIsNotAvailableToReturnError);
  })

  it('should not be able to return an order with a status diferent from PICKED_UP', async () => {
    const order = makeOrder({
      status : 'WAITING_PICKUP',
      deliveryPersonId : new UniqueEntityID('1')
    });

    inMemoryOrdersRepository.create(order);

    const result = await sut.execute({
      orderId : order.id.toString(),
      deliveryPersonId : '1'
    })

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(OrderIsNotAvailableToReturnError);
  })

  it('should not be able to return an order with a diferent delivery person', async () => {
    const order = makeOrder({
      status : 'PICKED_UP',
      deliveryPersonId : new UniqueEntityID('1')
    });

    inMemoryOrdersRepository.create(order);

    const result = await sut.execute({
      orderId : order.id.toString(),
      deliveryPersonId : '2'
    })

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(DeliveryPersonIsNotTheSameError);
  })


})