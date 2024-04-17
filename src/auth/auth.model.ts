import { Column, DataType, Model, Table, PrimaryKey, Default, Unique, HasMany } from 'sequelize-typescript';
import { AuthCredentialsDto } from './dtos/auth-credentials.dta';
import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcrypt'
import { Task } from 'src/tasks/task.model';

@Table
export class User extends Model {
        
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column({
        type: DataType.UUID
    })
    id: string;

    @Unique
    @Column
    username: string;

    @Column
    password: string;

    @HasMany(() => Task)
    tasks: Task[];

    static createUser = async (authCredentialsDto: AuthCredentialsDto): Promise<void> => {
        const { username, password } = authCredentialsDto
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt)
        const user = new User({username, password: hashedPassword})

        try {
            await user.save()
        } catch (error) {
            if (error.code === '23505') {
                throw new ConflictException('Username already exists')
            } else {
                throw new InternalServerErrorException()
            }
        }
    }

}