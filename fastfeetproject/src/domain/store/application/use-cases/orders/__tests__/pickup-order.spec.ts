import { InMemoryOrdersRepository } from "test/repositories/in-memory-orders-repository"
import { InMemoryUsersRepository } from "test/repositories/in-memory-users-repository"
import { PickupOrderUseCase } from "../pickup-order";
import { makeOrder } from "test/factories/make-order";
import { makeUser } from "test/factories/make-user";
import { OrderIsNotAvailableToPickupError } from "@/core/errors/errors/order-is-not-available-to-pickup-error";
import { DeliveryPersonNotFoundError } from "@/core/errors/errors/delivery-person-not-found-error";


let inMemoryOrdersRepository : InMemoryOrdersRepository;
let inMemoryUsersRepository : InMemoryUsersRepository;
let sut : PickupOrderUseCase

describe('PickUp Order', () => {

  beforeEach(() => {
    inMemoryOrdersRepository = new InMemoryOrdersRepository();
    inMemoryUsersRepository = new InMemoryUsersRepository();
    sut = new PickupOrderUseCase(inMemoryOrdersRepository, inMemoryUsersRepository);
  })

  it('should be able to pickup the order', async () => {
    const order = makeOrder({});
    const user = makeUser({});

    inMemoryOrdersRepository.create(order);
    inMemoryUsersRepository.create(user);

    const result = await sut.execute({
      orderId: order.id.toString(), 
      deliveryPersonId : user.id.toString()
    })       

    expect(result.isRight()).toBe(true)
    if(result.isRight())
    {
      // Verifica se o id entregador é o mesmo id do usuário
      expect(user.id.toString()).toBe(result.value?.order.deliveryPersonId)

      expect(result.value?.order.status).toBe('PICKED_UP');
      expect(result.value?.order.withdrawalDate).toBeInstanceOf(Date)
    }
  })

  it('should not be able to pick up an order with a status different from WAITING_PICKUP', async () => {

    const order = makeOrder({
      status : 'PICKED_UP'
    });
    const deliveryPerson = makeUser({});

    inMemoryOrdersRepository.create(order);
    inMemoryUsersRepository.create(deliveryPerson);

    const result = await sut.execute({
      deliveryPersonId : deliveryPerson.id.toString(),
      orderId : order.id.toString()
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(OrderIsNotAvailableToPickupError)
  })

  it('should not be able to pick up an order with a non existent delivery person', async () => {

    const order = makeOrder();
    inMemoryOrdersRepository.create(order)

    const result = await sut.execute({
      orderId : order.id.toString(),
      deliveryPersonId : 'non-existent'
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(DeliveryPersonNotFoundError)
  })


})