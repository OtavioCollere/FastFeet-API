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

  it("[GET] /recipients", async() => { 

    const recipient = await recipientFactory.makePrismaRecipient({
      name : 'Otavio'
    });

    const response = await request(app.getHttpServer()).get(`/recipients/${recipient.id.toString()}`)
    .send();

    expect(response.status).toBe(201)

  })
})