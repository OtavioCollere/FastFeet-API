import { Entity } from 'src/core/entities/entity';
import { UniqueEntityID } from 'src/core/entities/unique-entity-id';
import type { Optional } from 'src/core/types/optional';

export interface RecipientProps {
  name: string;
  zipCode: string;
  address: string;
  district: string;
  number: string;
  phone: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Recipient extends Entity<RecipientProps> {
  get name(): string {
    return this.props.name;
  }

  set name(value: string) {
    this.props.name = value;
    this.touch();
  }

  get zipCode(): string {
    return this.props.zipCode;
  }

  set zipCode(value: string) {
    this.props.zipCode = value;
    this.touch();
  }

  get address(): string {
    return this.props.address;
  }

  set address(value: string) {
    this.props.address = value;
    this.touch();
  }

  get district(): string {
    return this.props.district;
  }

  set district(value: string) {
    this.props.district = value;
    this.touch();
  }

  get number(): string {
    return this.props.number;
  }

  set number(value: string) {
    this.props.number = value;
    this.touch();
  }

  get phone(): string {
    return this.props.phone;
  }

  set phone(value: string) {
    this.props.phone = value;
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
    props: Optional<RecipientProps, 'createdAt' | 'updatedAt'>,
    id?: UniqueEntityID
  ) {
    const recipient = new Recipient(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
        updatedAt: props.updatedAt ?? new Date()
      },
      id
    );

    return recipient;
  }
}
