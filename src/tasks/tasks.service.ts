import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { TaskStatus } from './task1.model';
import { CreateTaskDto } from './dtos/create-task.dto';
import { FilteredTasksDto } from './dtos/filtered-tasks.dto';
import {Task} from './task.model';
import { User } from 'src/auth/auth.model';

@Injectable()
export class TasksService {

    constructor(
        @InjectModel(Task)
        private taskModel: typeof Task,
    ) {}

    getTasks(filteredTasksDto: FilteredTasksDto, user: User): Promise<Task[]> {
        return this.taskModel.getTasks(filteredTasksDto, user)
    }

    createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
        return this.taskModel.createTask(createTaskDto, user)
    }

    async getTaskById(id: string, user: User): Promise<Task> {
        const found = await this.taskModel.findOne({
            where: {
                id,
                userId: user.id
            }
        })
        if (!found) throw new NotFoundException()
        return found
    }

    async deleteTask(id: string, user: User) {
        const deleted = await this.taskModel.deleteTaskById(id, user)

        if (deleted === 0) throw new NotFoundException()
    }

    async updateStatus(id: string, status: TaskStatus, user: User): Promise<Task> {
        const task = await this.getTaskById(id, user)
        task.status = status
        await task.save()
        return task
    }
}
