import { Controller, Post } from '@nestjs/common';
import { QuestionService } from './question.service';
import { RequireLogin, UserInfo } from 'src/custom.decorator';
import { QuestionAddDto } from './dto/question-add.dto';
import { QuestionSearchDto } from './dto/question-search.dto';

@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post('add')
  @RequireLogin()
  async add(dto: QuestionAddDto, @UserInfo('username') username: string) {
    return await this.questionService.add(dto, username);
  }

  @Post('list')
  @RequireLogin()
  async list(dto: QuestionSearchDto) {
    return await this.questionService.list(dto);
  }
}
