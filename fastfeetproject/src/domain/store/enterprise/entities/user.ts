import { Entity } from 'src/core/entities/entity';
import { UniqueEntityID } from 'src/core/entities/unique-entity-id';
import type { Optional } from 'src/core/types/optional';

export interface UserProps {
  name : string,
  cpf: string;
  password: string;
  admin?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export class User extends Entity<UserProps> {

  get name() : string {
    return this.props.name;
  }

  set name(value : string) {
    this.props.name = value;
    this.touch();
  }

  get cpf(): string {
    return this.props.cpf;
  }

  set cpf(value: string) {
    this.props.cpf = value;
    this.touch();
  }

  get password(): string {
    return this.props.password;
  }

  set password(value: string) {
    this.props.password = value;
    this.touch();
  }

  get admin(): boolean | undefined {
    return this.props.admin;
  }

  set admin(value: boolean) {
    this.props.admin = value;
    this.touch();
  }

  get createdAt(): Date | undefined {
    return this.props.createdAt;
  }

  get updatedAt(): Date | undefined {
    return this.props.updatedAt;
  }

  private touch(): void {
    this.props.updatedAt = new Date();
  }

  static create(
    props: Optional<UserProps, 'admin' | 'createdAt' | 'updatedAt'>,
    id?: UniqueEntityID,
  ) {
    const user = new User(
      {
        ...props,
        admin : props.admin ?? false,
        createdAt: props.createdAt ?? new Date(),
        updatedAt: props.updatedAt ?? new Date(),
      },
      id,
    );

    return user;
  }
}
