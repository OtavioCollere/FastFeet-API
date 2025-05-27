import type { Encrypter } from "@/domain/store/application/cryptograph/encrypter";
import jwt from "jsonwebtoken";

export class JwtEncrypter implements Encrypter{
  constructor(
    private jwtService : JwtService
  ) {}

  async encrypt(payload: Record<string, unknown>): Promise<string> {
    await this.jwtService.signAsync(payload)
  }

}