import { IsNotEmpty } from "class-validator";
import { QuestionAddDto } from "./question-add.dto";
import { PartialType } from "@nestjs/mapped-types";

export class QuestionUpdateDto extends PartialType(QuestionAddDto) {
    @IsNotEmpty({ message: 'id不能为空' })
    id: number;
}