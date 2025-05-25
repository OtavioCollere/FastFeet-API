import { InMemoryUsersRepository } from "test/repositories/in-memory-users-repository";
import { RegisterUserUseCase } from "../register-user";
import { FakeHasher } from "test/cryptograph/fake-hasher";
import { makeUser } from "test/factories/make-user";
import { CpfAlreadyRegistered } from "@/core/errors/errors/cpf-already-registered-error";


let inMemoryUsersRepository : InMemoryUsersRepository
let fakeHasher : FakeHasher
let sut : RegisterUserUseCase

describe('Register user', () => {

  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    fakeHasher = new FakeHasher();
    sut = new RegisterUserUseCase(inMemoryUsersRepository, fakeHasher);
  })

  it('should be able to register a new user', async () => {
    
    const result = await sut.execute({
      name : 'Otavio',
      cpf : '32112345692',
      password : 'teste'
    })

    expect(result.isRight()).toBe(true);
    expect(result.value).toEqual({
      user : inMemoryUsersRepository.items[0]
    })

  })

  it('should hash user password upon registration', async () => {

    const result = await sut.execute({
      name : 'Otavio',
      cpf : '32112345692',
      password : 'pass123'
    })

    const hashedPassword = await fakeHasher.hash('pass123');

    expect(result.isRight()).toBe(true);
    if(result.isRight())
    {
      expect(result.value.user.password).toEqual(hashedPassword);
    }
  })

  it('should not able to register a user with existent CPF', async () => {

    const user_ = makeUser({cpf : '32112345692'});
    inMemoryUsersRepository.create(user_)

    const result = await sut.execute({
      name : 'Otavio',
      cpf : '32112345692',
      password : 'pass123'
    })

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(CpfAlreadyRegistered)
  })

})