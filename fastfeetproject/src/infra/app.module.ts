import { Module } from '@nestjs/common';
import { HttpModule } from './http/http.module';
import {ConfigModule } from '@nestjs/config';
import { envSchema } from './env/env';
import { AuthModule } from '@/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate : (env) => envSchema.parse(env)
    }),
    AuthModule,
    HttpModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
