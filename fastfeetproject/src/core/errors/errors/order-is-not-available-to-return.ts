import type { UseCaseError } from '../use-case-error';

export class OrderIsNotAvailableToReturnError extends Error implements UseCaseError {
  constructor() {
    super('To return the order, it must have the status WAITING');
  }
}
