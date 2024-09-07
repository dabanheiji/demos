import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { AnswerService } from './answer.service';
import { RequireLogin, UserInfo } from 'src/custom.decorator';
import { AnswerAddDto } from './dto/answer-add.dto';

@Controller('answer')
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}

  @Post('add')
  @RequireLogin()
  async add(@Body() addDto: AnswerAddDto, @UserInfo('userId') userId: number) {
    return await this.answerService.add(addDto, userId);
  }

  @Get('list')
  @RequireLogin()
  async list(@Query('examId') examId: string) {
    if (!examId) {
      throw new BadRequestException('examId 不能为空');
    }
    return await this.answerService.list(+examId);
  }

  @Get('find/:id')
  @RequireLogin()
  async find(@Param('id') id: string) {
    return await this.answerService.find(+id);
  }

  @Get('export')
  async export(@Query('examId') examId: string) {
    if (!examId) {
      throw new BadRequestException('examId 不能为空');
    }
    return await this.answerService.export(+examId);
  }
}
