import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma/prisma.service";
import { RecipientsRepository } from "@/domain/store/application/repositories/recipient-repository";
import { PrismaRecipientsRepository } from "./prisma/repositories/prisma-recipient-repository";
import { OrdersRepository } from "@/domain/store/application/repositories/orders-repository";
import { PrismaOrdersRepository } from "./prisma/repositories/prisma-orders-repository";
import { UsersRepository } from "@/domain/store/application/repositories/users-repository";
import { PrismaUsersRepository } from "./prisma/repositories/prisma-users-repository";

@Module({
  imports: [],
  providers: [
    PrismaService,
    {
      provide : RecipientsRepository,
      useClass : PrismaRecipientsRepository
    },
    {
      provide : OrdersRepository,
      useClass : PrismaOrdersRepository
    },
    {
    provide : UsersRepository,
    useClass : PrismaUsersRepository
    }
  ], 
  exports: [
    PrismaService,
    RecipientsRepository,
    OrdersRepository,
    UsersRepository
  ]
})
export class DatabaseModule{}