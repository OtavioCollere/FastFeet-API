import { RecipientsRepository } from "@/domain/store/application/repositories/recipient-repository";
import { Recipient } from "@/domain/store/enterprise/entities/recipient";
import { PrismaService } from "../prisma.service";
import { PrismaRecipientMapper } from "../mappers/prisma-recipient-mapper";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PrismaRecipientsRepository implements RecipientsRepository {
  constructor(private prisma : PrismaService){}
  
  async create(recipient: Recipient): Promise<Recipient> {
    const data = PrismaRecipientMapper.toPrisma(recipient);

    await this.prisma.recipient.create({
      data 
    })

    return recipient;
  } 

  async save(recipient: Recipient): Promise<Recipient> {
    const data = PrismaRecipientMapper.toPrisma(recipient)

    await this.prisma.recipient.update({
      where : {
        id : recipient.id.toString()
      }, data
    })

    return recipient;
  }

  async delete(recipient: Recipient): Promise<void> {
    await this.prisma.recipient.delete({
      where: {
        id: recipient.id.toString(),
      },
    });
  }

  async findByRecipientId(id: string): Promise<Recipient | null> {
    const recipient = await this.prisma.recipient.findUnique({
      where : {id}
    })

    if(!recipient) {
      return null;
    }
  
    return PrismaRecipientMapper.toDomain(recipient);
  }

}