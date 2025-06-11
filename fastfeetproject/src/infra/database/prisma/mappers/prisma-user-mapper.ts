
import { User } from "@/domain/store/enterprise/entities/user";
import { User as PrismaUser, type Prisma } from "generated/prisma";

export class PrismaUserMapper {
  
static toDomain(raw : PrismaUser) : User {
      return User.create({
        name : raw.name,
        cpf : raw.cpf,
        password : raw.password,
        admin : raw.admin
    })
  } 

  static toPrisma(user : User) : Prisma.UserUncheckedCreateInput {
    return {
      id: user.id.toString(),
      name: user.name,
      cpf: user.cpf,
      password: user.password
    }
  }
}