
import { AppModule } from "@/infra/app.module"
import { PrismaService } from "@/infra/database/prisma/prisma.service"
import type { INestApplication } from "@nestjs/common"
import { Test} from "@nestjs/testing"
import request from 'supertest'
import { RecipientFactory } from "test/factories/make-recipient"

describe('Return Order (E2E)', () => {
  let app: INestApplication
  let prisma : PrismaService
  let recipientFactory: RecipientFactory
  let orderFactory : OrderFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers : [RecipientFactory, OrderFactory]
    }).compile()

    app = moduleRef.createNestApplication()

    prisma = moduleRef.get(PrismaService)
    recipientFactory = moduleRef.get(RecipientFactory)

    await app.init()
  })

  test('[POST] /order', async () => {

    // criar factory do deliveryPerson
    const recipient = await recipientFactory.makePrismaRecipient();
    await prisma.recipients.create(recipient)

    const order = await orderFactory.makePrismaOrder({
      status : 'PICKED_UP',
      recipientId : recipient.id.toString(),
      deliveryPersonId : deliveryPerson.id.toString()
    })

    await prisma.order.create(order);
    
    const response = await request(app.getHttpServer()).post(`/orders/return-order`)
    .send({
      orderId : order.id.toString(),
      deliveryPersonId : 'criar user e passar id'
    });
  
    expect(response).toBe(201);

  })

})