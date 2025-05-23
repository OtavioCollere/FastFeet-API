import type { UseCaseError } from '../use-case-error';

export class OrderNotFoundError extends Error implements UseCaseError {
  constructor() {
    super('Order not found.');
  }
}
