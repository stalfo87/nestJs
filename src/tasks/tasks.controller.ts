import { Body, Controller, Get, Param, Post, Delete, Patch, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dtos/create-task.dto';
import { FilteredTasksDto } from './dtos/filtered-tasks.dto';
import { UpdateStatusDto } from './dtos/update-task.dto';
import {Task} from 'src/tasks/task.model';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) {
    }

    @Get()
    getAllTasks(@Query() filteredTasksDto: FilteredTasksDto): Promise<Task[]> {
        return this.tasksService.getTasks(filteredTasksDto)
    }

    @Post()
    createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
        return this.tasksService.createTask(createTaskDto)
    }

    @Get('/:id')
    async getTaskById(@Param('id') id: string): Promise<Task> {
        return this.tasksService.getTaskById(id)
    }

    @Delete('/:id')
    deleteTask(@Param('id') id: string) {
        this.tasksService.deleteTask(id)
    }

    @Patch('/:id/status')
    updateStatus(@Param('id') id: string, @Body() updateStatusDto: UpdateStatusDto): Promise<Task> {
        const {status} = updateStatusDto
        return this.tasksService.updateStatus(id, status)
    }
    
}
