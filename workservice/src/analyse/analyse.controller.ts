import { BadRequestException, Controller, Get, Query } from '@nestjs/common';
import { AnalyseService } from './analyse.service';

@Controller('analyse')
export class AnalyseController {
  constructor(private readonly analyseService: AnalyseService) {}

  @Get('ranking')
  async ranking(@Query('examId') examId: string) {
    if (!examId) {
      throw new BadRequestException('examId 不能为空');
    }
    return await this.analyseService.ranking(+examId);
  }
}