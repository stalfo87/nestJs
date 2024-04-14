import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './auth.model';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: '3.1416',
      signOptions: {
        expiresIn: 3600
      }
    }),
    SequelizeModule.forFeature([User]),

  ],
  providers: [AuthService,{
    provide: APP_GUARD,
    useClass: AuthGuard,
  },],
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthModule { }
