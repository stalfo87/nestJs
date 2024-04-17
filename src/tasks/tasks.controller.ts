import { Body, Controller, Get, Param, Post, Delete, Patch, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dtos/create-task.dto';
import { FilteredTasksDto } from './dtos/filtered-tasks.dto';
import { UpdateStatusDto } from './dtos/update-task.dto';
import {Task} from 'src/tasks/task.model';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/auth.model';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) {
    }

    @Get()
    getAllTasks(@Query() filteredTasksDto: FilteredTasksDto, @GetUser() user: User): Promise<Task[]> {
        return this.tasksService.getTasks(filteredTasksDto, user)
    }

    
    @Post()
    createTask(@Body() createTaskDto: CreateTaskDto, @GetUser() user: User): Promise<Task> {
        return this.tasksService.createTask(createTaskDto, user)
    }

    @Get('/:id')
    async getTaskById(@Param('id') id: string, @GetUser() user: User): Promise<Task> {
        return this.tasksService.getTaskById(id, user)
    }

    @Delete('/:id')
    deleteTask(@Param('id') id: string, @GetUser() user: User) {
        this.tasksService.deleteTask(id, user)
    }

    @Patch('/:id/status')
    updateStatus(@Param('id') id: string, @Body() updateStatusDto: UpdateStatusDto, @GetUser() user: User): Promise<Task> {
        const {status} = updateStatusDto
        return this.tasksService.updateStatus(id, status, user)
    }
    
}
