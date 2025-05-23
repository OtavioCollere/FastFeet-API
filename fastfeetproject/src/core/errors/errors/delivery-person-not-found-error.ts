import type { UseCaseError } from '../use-case-error';

export class DeliveryPersonNotFoundError extends Error implements UseCaseError {
  constructor() {
    super('Delivery Person not found.');
  }
}
