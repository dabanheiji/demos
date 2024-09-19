import { IsNotEmpty } from "class-validator";

export class RoleAddDto {
    @IsNotEmpty({ message: '角色名称不能为空' })
    name: string;

    @IsNotEmpty({ message: '角色标识不能为空' })
    code: string;

    @IsNotEmpty({ message: '角色描述不能为空' })
    description: string;
}