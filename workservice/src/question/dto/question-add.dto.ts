import { IsNotEmpty } from "class-validator";

export class QuestionAddDto {
    @IsNotEmpty({ message: '题目类型不能为空' })
    type: 'radio' | 'checkbox' | 'textarea';

    @IsNotEmpty({ message: '题目选项不能为空' })
    options?: string[];

    @IsNotEmpty({ message: '题目内容不能为空' })
    content?: string;

    @IsNotEmpty({ message: '题目答案不能为空' })
    answer?: string;

    @IsNotEmpty({ message: '答案解析不能为空' })
    analysis?: string;
}