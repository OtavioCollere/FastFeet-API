import type { User } from '../../enterprise/entities/user';

export abstract class UsersRepository {
  // Crud methods
  abstract create(user : User): Promise<User>;
  abstract save(user : User): Promise<User>;
  abstract delete(user: User): Promise<void>;

  // Finds
  abstract findByUserId(id : string) : Promise<User | null>
  abstract findByUserCPF(cpf : string) : Promise<User | null>

}
