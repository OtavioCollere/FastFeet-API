import { UsersRepository } from "@/domain/store/application/repositories/users-repository";
import type { User } from "@/domain/store/enterprise/entities/user";

export class InMemoryUsersRepository implements UsersRepository{
  public items: User[] = [];

  async findByUserId(id: string): Promise<User | null> {
    const user = this.items.find(user => user.id.toString() === id);
  
    if (!user) {
      return null;
    }

    return user;
  }

  async findByUserCPF(cpf: string): Promise<User | null> {
    const user = this.items.find(user => user.cpf === cpf);
  
    if (!user) {
      return null;
    }

    return user;
  }


  async save(user : User) : Promise<User> {
    const indexItem = this.items.findIndex((item) => item.id.toString() === user.id.toString())

    this.items[indexItem] = user;

    return user;
  }

  async create(user: User): Promise<User> {
    this.items.push(user);

    return user;
  }

  async delete(user: User): Promise<void> {
    this.items = this.items.filter(user => user.id.toString() !== user.id.toString());
  }
}