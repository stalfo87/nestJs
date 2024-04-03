import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [TasksModule,
  SequelizeModule.forRoot({
    dialect: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'tasks',
    models: [__dirname + '/models'],
    autoLoadModels: true,
    synchronize: true
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
