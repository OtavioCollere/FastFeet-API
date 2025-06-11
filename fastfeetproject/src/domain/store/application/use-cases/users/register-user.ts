import { left, right, type Either } from "@/core/either";
import { CpfAlreadyRegistered } from "@/core/errors/errors/cpf-already-registered-error";
import { User } from "@/domain/store/enterprise/entities/user";
import { UsersRepository } from "../../repositories/users-repository";
import type { HashGenerator } from "../../cryptograph/hash-generator";


export interface RegisterUserUseCaseRequest{
  name : string
  cpf : string
  password : string
}

type RegisterUserUseCaseResponse = Either<
CpfAlreadyRegistered,
{
  user : User
}
>

export class RegisterUserUseCase{
  
  constructor(
    private usersRepository : UsersRepository,
    private hashGenerator : HashGenerator
  ) {}

  async execute({name, cpf, password} : RegisterUserUseCaseRequest) : Promise<RegisterUserUseCaseResponse> {

    const cpfExists = await this.usersRepository.findByUserCPF(cpf);

    if(cpfExists) {
      return left(new CpfAlreadyRegistered);
    }

    const hashedPassword = await this.hashGenerator.hash(password);

    const user = User.create({
      name,
      cpf,
      password : hashedPassword
    })

    await this.usersRepository.create(user)

    return right({
      user
    })

  }

}