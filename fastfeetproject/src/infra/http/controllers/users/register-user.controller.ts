import { BadRequestException, Body, ConflictException, Controller, HttpCode, Post, UsePipes } from "@nestjs/common";
import { ZodValidationPipe } from "../../pipes/zod-validation-pipe";
import { z } from "zod";
import type { RegisterUserUseCase } from "@/domain/store/application/use-cases/users/register-user";
import { CpfAlreadyRegistered } from "@/core/errors/errors/cpf-already-registered-error";
import { Public } from "@/auth/public";

export const registerUserBodySchema = z.object({
  name: z.string(),
  cpf: z.string().min(11).max(11),
  password: z.string().min(6),
});

type RegisterUserBodySchema = z.infer<typeof registerUserBodySchema>;

@Controller('user')
@Public()
export class RegisterUserController {
  constructor(
    private readonly registerUser: RegisterUserUseCase
  ) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(registerUserBodySchema))
  async handle(@Body() body: RegisterUserBodySchema) {
    const { name, cpf, password } = body;

    const result = await this.registerUser.execute({
      name,
      cpf,
      password,
    });

    if (result.isLeft()) {
      const error = result.value;

      switch (error.constructor) {
        case CpfAlreadyRegistered:
          throw new ConflictException(error.message);
        default : 
          throw new BadRequestException(error.message)
      }
    }

  }
}
