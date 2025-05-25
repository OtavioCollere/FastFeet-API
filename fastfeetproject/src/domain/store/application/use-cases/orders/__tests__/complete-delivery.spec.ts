import { InMemoryOrdersRepository } from "test/repositories/in-memory-orders-repository";
import { CompleteDeliveryUseCase } from "../complete-delivery";
import { makeOrder } from "test/factories/make-order";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { OrderIsNotAvailableToDeliverError } from "@/core/errors/errors/order-is-not-available-to-deliver-error";
import { DeliveryPersonIsNotTheSameError } from "@/core/errors/errors/delivery-person-is-not-the-same-error";

let inMemoryOrdersRepository : InMemoryOrdersRepository;
let sut : CompleteDeliveryUseCase

describe('Complete Delivery', () => {

  beforeEach(() => {
    inMemoryOrdersRepository = new InMemoryOrdersRepository();
    sut = new CompleteDeliveryUseCase(inMemoryOrdersRepository);
  })

  it('should be able to complete delivery', async () => {

    const order = makeOrder({
      status : 'PICKED_UP',
      deliveryPersonId : new UniqueEntityID('1')
    });

    inMemoryOrdersRepository.create(order)

    const result = await sut.execute({
      deliveryPersonId : '1',
      orderId : order.id.toString()
    })

    expect(result.isRight()).toBe(true)
    if(result.isRight()) {
      expect(result.value.order.status).toEqual('DELIVERED');
      expect(result.value.order.deliveryDate).toBeInstanceOf(Date)
    }

  })

  it('should not be able to complete an order delivery with a status diferent from PICKED_UP', async () => {
    // Vai estar com waiting_pickup no momento da criacao
    const order = makeOrder({})

    await inMemoryOrdersRepository.create(order);

    const result = await sut.execute({
      orderId : order.id.toString(),
      deliveryPersonId : '1'
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(OrderIsNotAvailableToDeliverError)
  })

  it('should NOT be able to complete delivery with a different delivery person than the one who picked up the order', async () => {

    const order = makeOrder({
      status : 'PICKED_UP',
      deliveryPersonId : new UniqueEntityID('1')
    });

    inMemoryOrdersRepository.create(order)

    const result = await sut.execute({
      deliveryPersonId : '2',
      orderId : order.id.toString()
    })

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(DeliveryPersonIsNotTheSameError)
  })

  

})

