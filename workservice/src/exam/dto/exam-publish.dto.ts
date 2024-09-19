import { IsNotEmpty } from "class-validator";

export class ExamPublishDto {
    @IsNotEmpty({message: '用户id不能为空' })
    userIds: number[];
    
    @IsNotEmpty({message: '考试id不能为空' })
    examId: number;
}