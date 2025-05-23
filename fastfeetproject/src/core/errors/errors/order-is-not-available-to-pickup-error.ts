import type { UseCaseError } from '../use-case-error';

export class OrderIsNotAvailableToPickupError extends Error implements UseCaseError {
  constructor() {
    super('Order is not available to pickup.');
  }
}
