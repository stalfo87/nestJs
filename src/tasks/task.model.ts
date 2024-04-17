import { Column, DataType, Model, Table, PrimaryKey, Default, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { TaskStatus } from './task1.model';
import { CreateTaskDto } from './dtos/create-task.dto';
import { Op } from 'sequelize';
import { FilteredTasksDto } from './dtos/filtered-tasks.dto';
import { User } from 'src/auth/auth.model';

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

    @ForeignKey(() => User)
    @Column({
        type: DataType.UUID
    })
    userId: string;
  
    @BelongsTo(() => User)
    user: User;

    static createTask = (createTaskDto: CreateTaskDto, user: User): Promise<Task> => {
        const {title, description} = createTaskDto
        const task: Task = new Task({
            title,
            description,
            status: TaskStatus.CREATED,
            userId: user.id
        })

        return task.save()
    }

    static deleteTaskById = (id: string, user: User): Promise<number> => {
        return Task.destroy({
            where: {
                id,
                userId: user.id
            }
        })
    }

    static getTasks = (filteredTasksDto: FilteredTasksDto, user: User): Promise<Task[]> => {
        const {status, title} = filteredTasksDto
        return Task.findAll({
            where: {
                ...status && {status},
                ...title && {
                    [Op.or]: {
                        title: {[Op.like]: `%${title}%`},
                        description: {[Op.like]: `%${title}%`}
                    }
                },
                userId: user.id
            }
        })
    }
}