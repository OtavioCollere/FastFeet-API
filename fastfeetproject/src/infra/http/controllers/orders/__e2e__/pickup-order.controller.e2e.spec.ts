import { AppModule } from "@/infra/app.module"
import { PrismaService } from "@/infra/database/prisma/prisma.service"
import type { INestApplication } from "@nestjs/common"
import { Test} from "@nestjs/testing"
import request from 'supertest'
import { RecipientFactory } from "test/factories/make-recipient"

describe('[POST] /orders - Create order (E2E)', () => {
  let app: INestApplication
  let prisma : PrismaService
  let recipientFactory: RecipientFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      // aqui importar o database modulo e os factorys
      imports: [AppModule, DatabaseModule],
      providers : [OrderFactory, RecipientFactory],
    }).compile()

    app = moduleRef.createNestApplication()

    prisma = moduleRef.get(PrismaService)
    recipientFactory = moduleRef.get(RecipientFactory)

    await app.init()
  })

  test('should allow a delivery person to pick up an order', async () => {

    const recipient = await recipientFactory.makePrismaRecipient({})

    const order = await orderFactory.makePrismaOrder({
      recipientId : recipient.id.toString(), 
    });

    await prisma.order.create({order});

    const response = await request(app.getHttpServer()).post('/pickup').send({
      orderId : order.id.toString(),
      deliveryPersonId : order.deliveryPersonId.toString(),
    });

    expect(response.statusCode).toBe(201);import { AppModule } from "@/infra/app.module"
    import { PrismaService } from "@/infra/database/prisma/prisma.service"
    import type { INestApplication } from "@nestjs/common"
    import { Test} from "@nestjs/testing"
    import request from 'supertest'
    import { RecipientFactory } from "test/factories/make-recipient"
    
    describe('Create order (E2E)', () => {
      let app: INestApplication
      let prisma : PrismaService
      let recipientFactory: RecipientFactory
    
      beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
          imports: [AppModule],
          providers : [RecipientFactory]
        }).compile()
    
        app = moduleRef.createNestApplication()
    
        prisma = moduleRef.get(PrismaService)
        recipientFactory = moduleRef.get(RecipientFactory)
    
        await app.init()
      })
    
      test('[POST] /order', async () => {
    
        const recipient = await recipientFactory.makePrismaRecipient();
    
        const response = await request(app.getHttpServer()).post(`/${recipient.id}`)
        .send();
    
        expect(response.statusCode).toBe(201));
    
        const userOnDatabase = await prisma.order.findUnique({
          where : {
            cpf : 'cpf'
          }
        })
    
        expect(userOnDatabase).toBeTruthy()
    
      })
    
    })
    
    const userOnDatabase = await prisma.order.findUnique({
      where : {
        id : order.id.toString()
      }
    })

    expect(userOnDatabase).toBeTruthy();
    expect(userOnDatabase.status).toBe('PICKED_UP');
  })

  test('should not be able to pick up an order with status diferrent from "WAITING_PICKUP"', async () => {

    const recipient = await recipientFactory.makePrismaRecipient({});

    // when creating, status is 'WAITING_PICKUP' by default
    const order = orderFactory.makePrismaOrder({
      recipientId: recipient.id.toString()
      status : 'PICKED_UP'
    });
    await prisma.order.create(order);

    const response = await request(app.getHttpServer()).post('/pickup').send({
      orderId : order.id.toString(),
      deliveryPersonId : order.deliveryPersonId.toString(),
    })

    expect(response.statusCode).toBe(409);

  })

})