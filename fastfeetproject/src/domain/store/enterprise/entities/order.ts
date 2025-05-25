import { Entity } from 'src/core/entities/entity';
import { UniqueEntityID } from 'src/core/entities/unique-entity-id';
import type { Optional } from 'src/core/types/optional';

export interface OrderProps {
  deliveryPersonId?: UniqueEntityID;
  recipientId: UniqueEntityID;
  status: string;
  withdrawalDate?: Date | null | undefined;
  deliveryDate?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Order extends Entity<OrderProps> {
  get recipientId(): UniqueEntityID {
    return this.props.recipientId;
  }

  set recipientId(value : string) {
    this.props.recipientId = new UniqueEntityID(value);
    this.touch()
  }

  set deliveryPersonId(value: string) {
    this.props.deliveryPersonId = new UniqueEntityID(value);
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
    return this.props.withdrawalDate ?? undefined;
  }

  set withdrawalDate(value: Date | null) {
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

  pickup(deliveryPersonId: string) {
    this.withdrawalDate = new Date();
    this.deliveryPersonId = deliveryPersonId;
    this.status = 'PICKED_UP';
  }

  completeDelivery() {
    this.status = 'DELIVERED';
    this.deliveryDate = new Date();
  }

  returnOrder() {
    this.status = 'WAITING_PICKUP';
    this.withdrawalDate = null;
  }
  
  get deliveryPersonId(): string | undefined {
    return this.props.deliveryPersonId?.toString();
  }  

  private touch(): void {
    this.props.updatedAt = new Date();
  }

  static create(
    props: Optional<
      OrderProps,
      | 'deliveryPersonId'
      | 'withdrawalDate'
      | 'deliveryDate'
      | 'createdAt'
      | 'updatedAt'
    >,
    id?: UniqueEntityID
  ) {
    const order = new Order(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
        updatedAt: props.updatedAt ?? new Date()
      },
      id
    );

    return order;
  }
}
