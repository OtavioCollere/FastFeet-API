import type { Env } from "@/infra/env/env";
import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { JwtAuthGuard } from "./jwt-auth.guard";
import { APP_GUARD } from "@nestjs/core";

@Module({
  imports : [
    PassportModule,
    JwtModule.registerAsync({
      inject : [ConfigService],
      global : true,
      async useFactory(config : ConfigService<Env, true>) {
        const privateKey = config.get('JWT_PRIVATE_KEY', {infer : true})
        const publicKey = config.get('JWT_PRIVATE_KEY', {infer : true})

        return {
          signOptions : {algorithm : 'RS256'},
          privateKey : Buffer.from(privateKey, 'base64'),
          publicKey : Buffer.from(publicKey, 'base64')
        }

      }
    })
  ],
  providers: [
    {
      provide : APP_GUARD,
      useClass : JwtAuthGuard
    },
  ]
})
export class AuthModule{
  
}