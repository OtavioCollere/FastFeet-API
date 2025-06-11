import { AppModule } from "@/infra/app.module"
import { DatabaseModule } from "@/infra/database/database.module"
import { PrismaService } from "@/infra/database/prisma/prisma.service"
import type { INestApplication } from "@nestjs/common"
import { Test } from "@nestjs/testing"
import { OrderFactory } from "test/factories/make-order"
import { RecipientFactory } from "test/factories/make-recipient"
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

  it("[POST] /recipients", async() => { 

    const response = await request(app.getHttpServer()).post('/recipients/')
    .send({
      name: "Otavio",
      zipCode: "15912010", // <-- Corrigido aqui
      address: "rua tomas leao",
      district: "paraná",
      number: "41999998888",
      phone: "123123123"
    });

    const recipientInDatabase = await prisma.recipient.findUnique({
      where : {
        zipCode : '15912010'
      }
    })
    
    
    expect(response.status).toBe(201);
    expect(recipientInDatabase).toBeTruthy()
    expect(recipientInDatabase?.name).toBe('Otavio')
  })
})