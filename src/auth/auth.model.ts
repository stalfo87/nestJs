import { Column, DataType, Model, Table, PrimaryKey, Default } from 'sequelize-typescript';

@Table
export class User extends Model {
        
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column({
        type: DataType.UUID
    })
    id: string;

    @Column
    username: string;

    @Column
    password: string;

}