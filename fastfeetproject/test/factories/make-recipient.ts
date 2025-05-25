import type { UniqueEntityID } from '@/core/entities/unique-entity-id';
import {
  Recipient,
  type RecipientProps
} from '@/domain/store/enterprise/entities/recipient';

import { faker } from '@faker-js/faker';

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
