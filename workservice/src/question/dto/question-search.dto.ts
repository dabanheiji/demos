import { IsNotEmpty } from "class-validator";

export class QuestionSearchDto {
    @IsNotEmpty({ message: '页码不能为空' })
    pageNo: number;

    @IsNotEmpty({ message: '每页数量不能为空' })
    pageSize: number;

    type?: 'radio' | 'checkbox' | 'textarea';

    content?: string;
}