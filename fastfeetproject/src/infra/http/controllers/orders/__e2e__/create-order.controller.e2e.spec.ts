import { AppModule } from "@/infra/app.module"
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