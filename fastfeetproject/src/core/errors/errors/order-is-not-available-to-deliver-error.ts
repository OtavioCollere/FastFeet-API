import type { UseCaseError } from '../use-case-error';

export class OrderIsNotAvailableToDeliverError extends Error implements UseCaseError {
  constructor() {
    super('Order is not available to deliver.');
  }
}
