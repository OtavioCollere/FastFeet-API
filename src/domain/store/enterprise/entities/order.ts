import { Entity } from 'src/core/entities/entity';
import { UniqueEntityID } from 'src/core/entities/unique-entity-id';
import type { Optional } from 'src/core/types/optional';

interface OrderProps {
  deliveryPersonId: string; // trocar para userId
  recipientId: string;
  status: string;
  withdrawalDate?: Date;
  deliveryDate?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Order extends Entity<OrderProps> {
  get deliveryPersonId(): string {
    return this.props.deliveryPersonId;
  }

  set deliveryPersonId(value: string) {
    this.props.deliveryPersonId = value;
    this.touch();
  }

  get recipientId(): string {
    return this.props.recipientId;
  }

  set recipientId(value: string) {
    this.props.recipientId = value;
    this.touch();
  }

  get status(): string {
    return this.props.status;
  }

  set status(value: string) {
    this.props.status = value;
    this.touch();
  }

  get withdrawalDate(): Date | undefined {
    return this.props.withdrawalDate;
  }

  set withdrawalDate(value: Date | undefined) {
    this.props.withdrawalDate = value;
    this.touch();
  }

  get deliveryDate(): Date | undefined {
    return this.props.deliveryDate;
  }

  set deliveryDate(value: Date | undefined) {
    this.props.deliveryDate = value;
    this.touch();
  }

  get createdAt(): Date {
    return this.props.createdAt!;
  }

  get updatedAt(): Date {
    return this.props.updatedAt!;
  }

  private touch(): void {
    this.props.updatedAt = new Date();
  }

  static create(
    props: Optional<
      OrderProps,
      'withdrawalDate' | 'deliveryDate' | 'createdAt' | 'updatedAt'
    >,
    id?: string,
  ) {
    const order = new Order(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
        updatedAt: props.updatedAt ?? new Date(),
      },
      new UniqueEntityID(id),
    );

    return order;
  }
}
