import { Column, DataType, Model, Table, PrimaryKey, Default } from 'sequelize-typescript';
import { TaskStatus } from './task1.model';
import { CreateTaskDto } from './dtos/create-task.dto';

@Table
export class Task extends Model {
    
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column({
        type: DataType.UUID
    })
    id: string;

    @Column
    title: string;

    @Column
    description: string;

    @Column
    status: TaskStatus;

    static createTask = (createTaskDto: CreateTaskDto): Promise<Task> => {
        const {title, description} = createTaskDto
        const task: Task = new Task({
            title,
            description,
            status: TaskStatus.CREATED
        })

        return task.save()
    }
}