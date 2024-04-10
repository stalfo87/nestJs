import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { SequelizeModule } from '@nestjs/sequelize';
import {Task} from './task.model';
import { LoggerMiddleware } from '../auth/jwt.stragety';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [SequelizeModule.forFeature([Task]), AuthModule],
  controllers: [TasksController],
  providers: [TasksService]
})
export class TasksModule implements NestModule {
  configure(costumer: MiddlewareConsumer) {
    costumer.apply(LoggerMiddleware)
    .forRoutes('tasks')
  }}
