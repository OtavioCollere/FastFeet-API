import type { UseCaseError } from '../use-case-error';

export class RecipientNotFoundError extends Error implements UseCaseError {
  constructor() {
    super('Recipient not found.');
  }
}
