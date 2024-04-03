import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
// import { TaskStatus } from './task1.model';
import { CreateTaskDto } from './dtos/create-task.dto';
// import { v4 as uuid } from 'uuid'
// import { FilteredTasksDto } from './dtos/filtered-tasks.dto';
import {Task} from './task.model';

@Injectable()
export class TasksService {

    constructor(
        @InjectModel(Task)
        private userModel: typeof Task,
      ) {}
    // private tasks: Task[] = []

    // getAllTasks(): Task[] {
    //     return this.tasks
    // }

    // getFilteredTasks(filteredTasksDto: FilteredTasksDto): Task[] {
    //     let tasks = this.getAllTasks()

    //     if (filteredTasksDto.title) {
    //         tasks = tasks.filter(e => e.title.includes(filteredTasksDto.title) || e.description.includes(filteredTasksDto.title))   
    //     }

    //     if (filteredTasksDto.status) {
    //         tasks = tasks.filter(e => e.status === filteredTasksDto.status)   
    //     }

    //     return tasks
    // }

    createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        return this.userModel.createTask(createTaskDto)
    }

    async getTaskById(id: string): Promise<Task> {
        const found = await this.userModel.findByPk(id)
        if (!found) throw new NotFoundException()
        return found
    }

    // deleteTask(id: string) {
    //     const found = this.getTaskById(id)
    //     this.tasks = this.tasks.filter(e => e.id !== found.id)
    // }

    // updateStatus(id: string, status: TaskStatus): Task {
    //     const task = this.getTaskById(id)
    //     task.status = status
    //     return task
    // }
}
