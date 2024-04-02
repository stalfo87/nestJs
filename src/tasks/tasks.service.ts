import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dtos/create-task.dto';
import { v4 as uuid } from 'uuid'
import { FilteredTasksDto } from './dtos/filtered-tasks.dto';

@Injectable()
export class TasksService {
    private tasks: Task[] = []

    getAllTasks(): Task[] {
        return this.tasks
    }

    getFilteredTasks(filteredTasksDto: FilteredTasksDto): Task[] {
        let tasks = this.getAllTasks()

        if (filteredTasksDto.title) {
            tasks = tasks.filter(e => e.title.includes(filteredTasksDto.title) || e.description.includes(filteredTasksDto.title))   
        }

        if (filteredTasksDto.status) {
            tasks = tasks.filter(e => e.status === filteredTasksDto.status)   
        }

        return tasks
    }

    createTask(createTaskDto: CreateTaskDto): Task {
        const {title, description} = createTaskDto
        const task: Task = {
            id: uuid(),
            title,
            description,
            status: TaskStatus.CREATED
        }

        this.tasks.push(task)

        return task
    }

    getTaskById(id: string): Task {
        const found = this.tasks.find(e => e.id === id)
        if (!found) throw new NotFoundException()
        return found
    }

    deleteTask(id: string) {
        const found = this.getTaskById(id)
        this.tasks = this.tasks.filter(e => e.id !== found.id)
    }

    updateStatus(id: string, status: TaskStatus): Task {
        const task = this.getTaskById(id)
        task.status = status
        return task
    }
}
