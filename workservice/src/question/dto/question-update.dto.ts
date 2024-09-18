import { IsNotEmpty } from "class-validator";
import { QuestionAddDto } from "./question-add.dto";

export class QuestionUpdateDto extends QuestionAddDto {
    @IsNotEmpty({ message: 'id不能为空' })
    id: number;
}