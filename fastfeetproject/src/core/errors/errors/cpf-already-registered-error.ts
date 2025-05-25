import type { UseCaseError } from "../use-case-error";

export class CpfAlreadyRegistered extends Error implements UseCaseError {
  constructor() {
    super('CPF already registered in our system.');
  }
}
