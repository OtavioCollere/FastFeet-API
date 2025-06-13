import { AppModule } from "@/infra/app.module"
import { DatabaseModule } from "@/infra/database/database.module"
import { PrismaService } from "@/infra/database/prisma/prisma.service"
import type { INestApplication } from "@nestjs/common"
import { Test} from "@nestjs/testing"
import request from 'supertest'
import { OrderFactory } from "test/factories/make-order"
import { RecipientFactory } from "test/factories/make-recipient"

describe('Complete delivery (E2E)', () => {
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
    await prisma.recipient.create(recipient)

    const order = await orderFactory.makePrismaOrder({
      status : 'PICKED_UP',
      recipientId : recipient.id.toString(),
      deliveryPersonId : deliveryPerson.id.toString()
    })

    await prisma.order.create(order);

    const response = await request(app.getHttpServer()).post(`/orders/complete-delivery`)
    .send({
      orderId : '',
      deliveryPersonId : ''
    });

    const orderInDatabase = await prisma.order.findUnique({
      where : {
        id : order.id.toString()
      }
    })

    expect(response.status).toBe(201);
    expect(orderInDatabase.status).toBe('DELIVERED');
    expect(orderInDatabase.completedAt).toBeDefined();  
  })

})