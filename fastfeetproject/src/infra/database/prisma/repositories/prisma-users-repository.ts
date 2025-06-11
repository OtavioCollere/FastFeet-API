import { UsersRepository } from "@/domain/store/application/repositories/users-repository";
import type { User } from "@/domain/store/enterprise/entities/user";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { PrismaUserMapper } from "../mappers/prisma-user-mapper";


@Injectable()
export class PrismaUsersRepository implements UsersRepository {
  constructor(private prisma: PrismaService) {}

  async create(user: User): Promise<User> {
    const data = PrismaUserMapper.toPrisma(user);

    await this.prisma.user.create({ data });

    return user;
  }

  async save(user: User): Promise<User> {
    const data = PrismaUserMapper.toPrisma(user);

    await this.prisma.user.update({
      where: { id: user.id.toString() },
      data,
    });

    return user;
  }

  async delete(user: User): Promise<void> {
    await this.prisma.user.delete({
      where: { id: user.id.toString() },
    });
  }

  async findByUserId(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) return null;

    return PrismaUserMapper.toDomain(user);
  }

  async findByUserCPF(cpf: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { cpf },
    });

    if (!user) return null;

    return PrismaUserMapper.toDomain(user);
  }
}
