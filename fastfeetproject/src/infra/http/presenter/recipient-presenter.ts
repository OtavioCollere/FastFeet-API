import type { Recipient } from "@/domain/store/enterprise/entities/recipient";

export class RecipientPresenter{
  static toHTTP(recipient : Recipient) {
    return {
      id: recipient.id,
      name : recipient.name,
      zipCode : recipient.zipCode,
      address : recipient.address,
      district : recipient.district,
      number : recipient.district,
      phone : recipient.phone
    }
  }
}