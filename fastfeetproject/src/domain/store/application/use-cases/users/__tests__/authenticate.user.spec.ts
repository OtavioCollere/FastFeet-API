import { InMemoryUsersRepository } from "test/repositories/in-memory-users-repository";
import { FakeHasher } from "test/cryptograph/fake-hasher";
import { AuthenticateUserUseCase } from "../authenticate-user";
import { FakeEncrypter } from "test/cryptograph/fake-encrypter";
import { makeUser } from "test/factories/make-user";
import { WrongCredentialsdError } from "@/core/errors/errors/wrong-credentials-error";


let inMemoryUsersRepository: InMemoryUsersRepository;
let fakeHasher: FakeHasher;
let fakeEncrypter: FakeEncrypter;
let sut: AuthenticateUserUseCase;

describe('Authenticate user', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    fakeHasher = new FakeHasher();
    fakeEncrypter = new FakeEncrypter();
    sut = new AuthenticateUserUseCase(
      inMemoryUsersRepository,
      fakeHasher,
      fakeEncrypter
    );
  });

  it('should be able to authenticate a user', async () => {
    const hashedPassword = await fakeHasher.hash('teste');
    const user = makeUser({
      cpf: '32112345692',
      password: hashedPassword
    });

    inMemoryUsersRepository.create(user);

    const result = await sut.execute({
      cpf: '32112345692',
      password: 'teste'
    });

    expect(result.isRight()).toBe(true);
    expect(result.value).toEqual({
      acessToken: expect.any(String)
    })
  });

  it('should not be able to authenticate with non-existent CPF', async () => {
    const result = await sut.execute({
      cpf: '00000000000', // CPF que não existe
      password: 'any-password'
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(WrongCredentialsdError);
  });

  it('should not be able to authenticate with incorrect password', async () => {
    const hashedPassword = await fakeHasher.hash('correct-password');
    const user = makeUser({
      cpf: '32112345692',
      password: hashedPassword
    });

    inMemoryUsersRepository.create(user);

    const result = await sut.execute({
      cpf: '32112345692',
      password: 'wrong-password' // senha errada
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(WrongCredentialsdError);
  });
});
