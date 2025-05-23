import type { UseCaseError } from "../use-case-error";


export class DeliveryPersonIsNotTheSameError extends Error implements UseCaseError {
  constructor() {
    super('The delivery person attempting to deliver is not the same who picked up the order.');
  }
}
