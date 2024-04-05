import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './auth.model';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: '3.1416',
      signOptions: {
        expiresIn: 3600
      }
    }),
    SequelizeModule.forFeature([User]),
  ],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
