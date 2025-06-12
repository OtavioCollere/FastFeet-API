import { AppModule } from "@/infra/app.module"
import { DatabaseModule } from "@/infra/database/database.module"
import { PrismaService } from "@/infra/database/prisma/prisma.service"
import type { INestApplication } from "@nestjs/common"
import { Test } from "@nestjs/testing"
import { RecipientFactory } from "test/factories/make-recipient"
import request from 'supertest'

describe("DeleteRecipientController E2E Tests", () => {
  let app: INestApplication
  let prisma: PrismaService
  let recipientFactory: RecipientFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [RecipientFactory],
    }).compile()

    app = moduleRef.createNestApplication()
    prisma = moduleRef.get(PrismaService)
    recipientFactory = moduleRef.get(RecipientFactory)
    await app.init()
  })

  it("[DELETE] /recipient/:recipientId", async () => {
    const recipient = await recipientFactory.makePrismaRecipient({
      name: 'Otavio Takaki',
      zipCode: '88800000'
    })

    const response = await request(app.getHttpServer())
      .delete(`/recipient/${recipient.id}`)
      .send()

    const recipientInDatabase = await prisma.recipient.findUnique({
      where: { id: recipient.id.toString() }
    })

    expect(response.status).toBe(204)
    expect(recipientInDatabase).toBeNull()
  })
})
