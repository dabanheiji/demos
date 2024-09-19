import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { QuestionService } from './question.service';
import { RequireLogin, UserInfo } from 'src/custom.decorator';
import { QuestionAddDto } from './dto/question-add.dto';
import { QuestionSearchDto } from './dto/question-search.dto';
import { QuestionUpdateDto } from './dto/question-update.dto';

@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post('add')
  @RequireLogin()
  async add(@Body() dto: QuestionAddDto, @UserInfo('username') username: string) {
    return await this.questionService.add(dto, username);
  }

  @Post('list')
  @RequireLogin()
  async list(@Body() dto: QuestionSearchDto) {
    return await this.questionService.list(dto);
  }

  @Post('update')
  @RequireLogin()
  async update(@Body() dto: QuestionUpdateDto, @UserInfo('username') username: string) {
    return await this.questionService.update(dto, username);
  }

  @Delete('detale/:id')
  @RequireLogin()
  async delete(@Param('id') id: string) {
    return await this.questionService.detete(+id);
  }

  @Get('find/:id')
  @RequireLogin()
  async find(@Param('id') id: string) {
    return await this.questionService.find(+id);
  }

  @Get('findExams/:id')
  @RequireLogin()
  async findExams(@Param('id') id: string) {
    return await this.questionService.findExams(+id);
  }
}
