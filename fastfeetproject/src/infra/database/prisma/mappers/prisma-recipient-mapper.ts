// importar Recipient as PrismaRecipient

import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Recipient } from "@/domain/store/enterprise/entities/recipient";
import type { Recipient as PrismaRecipient, Prisma } from "generated/prisma";

export class PrismaRecipientMapper{
  static toDomain(raw : PrismaRecipient) : Recipient {
    return Recipient.create({
      name : raw.name,
      zipCode : raw.zip_code,
      address : raw.address,
      district : raw.district,
      number : raw.number,
      phone : raw.phone,
    }, new UniqueEntityID(raw.id))
  }

  static toPrisma(recipient: Recipient) : Prisma.RecipientUncheckedCreateInput {
    return {
      id: recipient.id.toString(),
      name: recipient.name,
      zip_code: recipient.zipCode,
      address: recipient.address,
      district: recipient.district,
      number: recipient.number,
      phone: recipient.phone,
    }
  }
}