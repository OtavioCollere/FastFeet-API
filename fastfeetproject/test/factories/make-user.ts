import type { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { User, type UserProps } from "@/domain/store/enterprise/entities/user";
import { faker } from "@faker-js/faker";

export function makeUser(
  override : Partial<UserProps>,
  id? : UniqueEntityID
) {
  const user = User.create({
    ...override,
    name : faker.person.fullName(),
    cpf : override.cpf ?? '08874423392',
    password : override.password ?? faker.internet.password(),
    admin : false,
  }, id);

  return user;

}