import { IsEnum, IsOptional, IsString } from "class-validator"
import { TaskStatus } from "../task1.model"


export class FilteredTasksDto {
    @IsOptional()
    @IsString()
    title?: string

    @IsOptional()
    @IsEnum(TaskStatus)
    status?: TaskStatus
}