import type { UniqueEntityID } from '@/core/entities/unique-entity-id';
import {
  Recipient,
  type RecipientProps
} from '@/domain/store/enterprise/entities/recipient';
import { PrismaRecipientMapper } from '@/infra/database/prisma/mappers/prisma-recipient-mapper';
import type { PrismaService } from '@/infra/database/prisma/prisma.service';

import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';

export function makeRecipient(override: Partial<RecipientProps>, id?: UniqueEntityID) {
  const recipient = Recipient.create(
    {
      name: faker.person.fullName(),
      zipCode: faker.location.zipCode(),
      address: faker.location.streetAddress(),
      district: faker.location.state(),
      number: '123',
      phone: '41996335828',
      ...override
    },
    id
  );

  return recipient;
}

@Injectable()
export class RecipientFactory{
  constructor(private prisma : PrismaService) {}

  async makePrismaRecipient(data: Partial<RecipientProps> = {} ): Promise<Recipient> {
    const recipient = makeRecipient(data);

    await this.prisma.recipient.create({
      data : PrismaRecipientMapper.toPrisma(recipient)
    })

    return recipient
  }
} 