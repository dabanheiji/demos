import { PartialType } from "@nestjs/mapped-types";
import { RoleAddDto } from "./role-add.dto";
import { IsNotEmpty } from "class-validator";

export class RoleUpdateDto extends PartialType(RoleAddDto) {
    @IsNotEmpty({ message: '角色id不能为空' })
    id: number;
}