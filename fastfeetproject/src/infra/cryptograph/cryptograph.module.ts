import { Encrypter } from "@/domain/store/application/cryptograph/encrypter";
import { Module } from "@nestjs/common";
import { JwtEncrypter } from "./jwt-encrypter";
import { HashComparer } from "@/domain/store/application/cryptograph/hash-comparer";
import { BcryptHasher } from "./bcrypt-hasher";
import { HashGenerator } from "@/domain/store/application/cryptograph/hash-generator";

@Module({
  providers : [
    { provide: Encrypter, useClass : JwtEncrypter },
    { provide: HashComparer, useClass : BcryptHasher },
    { provide: HashGenerator, useClass : BcryptHasher }
  ],
  exports : [
    Encrypter,
    HashComparer,
    HashGenerator
  ]
})
export class CryptographModule {}