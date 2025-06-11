
import { BadRequestException, Body, Controller, HttpCode, Post, UnauthorizedException, UsePipes } from "@nestjs/common";
import { ZodValidationPipe } from "../../pipes/zod-validation-pipe";
import { z } from "zod";
import type { AuthenticateUserUseCase } from "@/domain/store/application/use-cases/users/authenticate-user";
import { WrongCredentialsdError } from "@/core/errors/errors/wrong-credentials-error";

export const authenticateUserBodySchema = z.object({
  cpf: z.string().min(11).max(11),
  password: z.string().min(6),
});

type AuthenticateUserBodySchema = z.infer<typeof authenticateUserBodySchema>;

@Controller('/sessions')
export class RegisterUserController {
  constructor(
    private readonly authenticateUser : AuthenticateUserUseCase
  ) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(authenticateUserBodySchema))
  async handle(@Body() body: AuthenticateUserBodySchema) {
    const { cpf, password } = body;

    const result = await this.authenticateUser.execute({
      cpf,
      password,
    });

    if (result.isLeft()) {
      const error = result.value;

      switch (error.constructor) {
        case WrongCredentialsdError:
          throw new UnauthorizedException(error.message);
        default : 
          throw new BadRequestException(error.message)
      }
    }

    const { acessToken } = result.value

    return {
      acess_token : acessToken
    }

  }
}
