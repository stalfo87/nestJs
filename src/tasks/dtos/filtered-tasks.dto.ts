import { IsEnum, IsOptional, IsString } from "class-validator"
import { TaskStatus } from "../task.model"


export class FilteredTasksDto {
    @IsOptional()
    @IsString()
    title?: string

    @IsOptional()
    @IsEnum(TaskStatus)
    status?: TaskStatus
}