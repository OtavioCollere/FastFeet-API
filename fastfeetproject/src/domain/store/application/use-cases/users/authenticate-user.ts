import { left, right, type Either } from "@/core/either";
import type { UsersRepository } from "../../repositories/users-repository";
import { WrongCredentialsdError } from "@/core/errors/errors/wrong-credentials-error";
import type { HashComparer } from "../../cryptograph/hash-comparer";
import type { Encrypter } from "../../cryptograph/encrypter";


export interface AuthenticateUserUseCaseRequest{
  cpf : string
  password : string
}

type AuthenticateUserUseCaseResponse = Either<
WrongCredentialsdError,
{
  acessToken : string
}
>

export class AuthenticateUserUseCase{
  
  constructor(
    private usersRepository : UsersRepository,
    private hashComparer : HashComparer,
    private encrypter : Encrypter
  ) {}

  async execute({cpf, password} : AuthenticateUserUseCaseRequest) : Promise<AuthenticateUserUseCaseResponse> {

    const user = await this.usersRepository.findByUserCPF(cpf);

    if(!user) {
      return left(new WrongCredentialsdError());
    }

    const passwordDoesMatch = await this.hashComparer.compare(password, user.password);

    if (!passwordDoesMatch){
      return left(new WrongCredentialsdError());
    }

    const acessToken = await this.encrypter.encrypt({
      sub : user.id.toString()
    })

    return right({
      acessToken
    })

  }

}