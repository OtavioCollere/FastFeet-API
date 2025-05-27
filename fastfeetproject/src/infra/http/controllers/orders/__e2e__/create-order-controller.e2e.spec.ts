import type { PrismaService } from "@/infra/database/prisma/prisma.service"
import type { INestApplication } from "@nestjs/common"
import { Test} from "@nestjs/testing"

describe('Create order (E2E)', () => {
  let app: INestApplication
  let prisma : PrismaService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleRef.createNestApplication()

    prisma = moduleRef.get(PrismaService)

    await app.init()
  })

  test('[POST] /orders', async () => {
    const response = await request(app.getHttpServer()).post('/order/valid-recipient-id')
    .send() 


    expect(response.statusCode).toBe(201))

    const userOnDatabase = await prisma.order.findUnique({
      where : {
        cpf : 'cpf'
      }
    })

    expect(userOnDatabase).toBeTruthy()

  })

})