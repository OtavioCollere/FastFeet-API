
import { AppModule } from "@/infra/app.module"
import { DatabaseModule } from "@/infra/database/database.module"
import { PrismaService } from "@/infra/database/prisma/prisma.service"
import type { INestApplication } from "@nestjs/common"
import { Test } from "@nestjs/testing"
import { OrderFactory } from "test/factories/make-order"
import { makeRecipient, RecipientFactory } from "test/factories/make-recipient"
import request from 'supertest';

describe("CreateRecipientController E2E Tests", () => {
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

  it("[PATCH] /recipients", async() => { 

    const recipient = await recipientFactory.makePrismaRecipient({
      name : 'Otavio Takaki',
      zipCode : '830039090'
    })

    const response = await request(app.getHttpServer()).patch('/recipients').send({
      recipientId : recipient.id.toString(),
      name : 'Takaki Otavio',
      zipCode : '092148101',
    })

    const recipientInDatabase = await prisma.recipient.findUnique({
      where : {
        zipCode  : '092148101'
      }
    })

    expect(response.status).toBe(200)
    expect(recipientInDatabase?.name).toBe('Takaki Otavio')

  })
})