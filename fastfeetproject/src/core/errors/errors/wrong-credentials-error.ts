import type { UseCaseError } from '../use-case-error';

export class WrongCredentialsdError extends Error implements UseCaseError {
  constructor() {
    super('Wrong credentials error.');
  }
}
