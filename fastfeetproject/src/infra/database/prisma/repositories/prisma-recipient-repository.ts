import type { RecipientsRepository } from "@/domain/store/application/repositories/recipient-repository";
import type { Recipient } from "@/domain/store/enterprise/entities/recipient";
import type { PrismaService } from "../prisma.service";
import { PrismaRecipientMapper } from "../mappers/prisma-recipient-mapper";

// verificar se o mapper nao esta redundante

export class PrismaRecipientsRepository implements RecipientsRepository {
  constructor(private prisma : PrismaService){}
  
  async create(recipient: Recipient): Promise<Recipient> {
    const data = PrismaRecipientMapper.toPrisma(recipient);

    await this.prisma.recipient.create({
      data 
    })

    return PrismaRecipientMapper.toDomain(recipient)
  } 

  async save(recipient: Recipient): Promise<Recipient> {
    const data = PrismaRecipientMapper.toPrisma(recipient)

    await this.prisma.recipient.update({
      where : {
        id : recipient.id.toString()
      }, data
    })

    return PrismaRecipientMapper.toDomain(data);
  }

  delete(recipient: Recipient): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async findByRecipientId(id: string): Promise<Recipient | null> {
    const recipient = await this.prisma.recipient.findUnique({
      where : {id}
    })
  
    return PrismaRecipientMapper.toDomain(recipient) ?? null
  }

}