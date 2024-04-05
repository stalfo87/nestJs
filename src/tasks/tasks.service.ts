import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { TaskStatus } from './task1.model';
import { CreateTaskDto } from './dtos/create-task.dto';
import { FilteredTasksDto } from './dtos/filtered-tasks.dto';
import {Task} from './task.model';

@Injectable()
export class TasksService {

    constructor(
        @InjectModel(Task)
        private taskModel: typeof Task,
    ) {}

    getTasks(filteredTasksDto: FilteredTasksDto): Promise<Task[]> {
        return this.taskModel.getTasks(filteredTasksDto)
    }

    createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        return this.taskModel.createTask(createTaskDto)
    }

    async getTaskById(id: string): Promise<Task> {
        const found = await this.taskModel.findByPk(id)
        if (!found) throw new NotFoundException()
        return found
    }

    async deleteTask(id: string) {
        const deleted = await this.taskModel.deleteTaskById(id)

        if (deleted === 0) throw new NotFoundException()
    }

    async updateStatus(id: string, status: TaskStatus): Promise<Task> {
        const task = await this.getTaskById(id)
        task.status = status
        await task.save()
        return task
    }
}
