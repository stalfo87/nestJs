import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './auth.model';

@Module({
  imports: [SequelizeModule.forFeature([User])],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
