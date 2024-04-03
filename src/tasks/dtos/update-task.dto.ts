import { IsEnum } from "class-validator"
import { TaskStatus } from "../task1.model"


export class UpdateStatusDto {
    @IsEnum(TaskStatus)
    status?: TaskStatus
}