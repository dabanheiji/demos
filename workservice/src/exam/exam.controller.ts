import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { ExamService } from './exam.service';
import { RequireLogin, UserInfo } from 'src/custom.decorator';
import { ExamAddDto } from './dto/exam-add.dto';
import { ExamSaveDto } from './dto/exam-save.dto';
import { ExamPublishDto } from './dto/exam-publish.dto';

@Controller('exam')
export class ExamController {
  constructor(private readonly examService: ExamService) {}

  @Get()
  getHello(): string {
    return this.examService.getHello();
  }

  @Post('add')
  @RequireLogin()
  async add(@Body() dto: ExamAddDto, @UserInfo('userId') userId: number) {
    console.log(dto, userId);
    return await this.examService.add(dto, userId);
  }

  @Get('list')
  @RequireLogin()
  async list(@UserInfo('userId') userId: number, @Query('bin') bin: string) {
    return await this.examService.list(userId, bin);
  }

  @Get('listByStudent')
  @RequireLogin()
  async listByStudent(@UserInfo('userId') userId: number) {
    return await this.examService.listByStudent(userId);
  }

  @Delete('delete/:id')
  @RequireLogin()
  async del(@Param('id') id: string) {
    return await this.examService.del(+id);
  }

  @Post('save')
  @RequireLogin()
  async save(@Body() dto: ExamSaveDto) {
    return await this.examService.save(dto);
  }

  @Post('publish')
  @RequireLogin()
  async publish(@Body() dto: ExamPublishDto) {
    return await this.examService.publish(dto);
  }

  @Get('unpublish/:id')
  @RequireLogin()
  async unpublish(@Param('id') id: string) {
    return await this.examService.unpublish(+id);
  }

  @Get('find/:id')
  @RequireLogin()
  async find(@Param('id') id: string) {
    return await this.examService.find(+id);
  }
}
