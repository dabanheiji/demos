import { Inject, Injectable } from '@nestjs/common';
import { AnswerAddDto } from './dto/answer-add.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ExcelService } from 'src/excel/excel.service';

@Injectable()
export class AnswerService {
  @Inject(PrismaService)
  private prismaService: PrismaService;

  @Inject(ExcelService)
  private excelService: ExcelService;

  async add(dto: AnswerAddDto, userId: number) {
    const exam = await this.prismaService.exam.findUnique({
      where: {
        id: dto.examId,
      },
    });

    let questions = [];
    try {
      questions = JSON.parse(exam.content);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {}

    let answers = [];
    try {
      answers = JSON.parse(dto.content);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {}

    let totalScore = 0;
    answers.forEach((answer) => {
      const question = questions.find((item) => item.id === answer.id);

      if (question.type === 'input') {
        if (answer.answer.includes(question.answer)) {
          totalScore += question.score;
        }
      } else {
        if (answer.answer === question.answer) {
          totalScore += question.score;
        }
      }
    });

    return await this.prismaService.answer.create({
      data: {
        content: dto.content,
        score: totalScore,
        answerer: {
          connect: {
            id: userId,
          },
        },
        exam: {
          connect: {
            id: dto.examId,
          },
        },
      },
    });
  }

  async list(examId: number) {
    return await this.prismaService.answer.findMany({
      where: {
        examId,
      },
      include: {
        exam: true,
        answerer: true,
      },
    });
  }

  async find(id: number) {
    return await this.prismaService.answer.findUnique({
      where: {
        id,
      },
      include: {
        exam: true,
        answerer: true,
      },
    });
  }

  async export(examId: number) {
    const list = await this.list(examId);

    const columns = [
      { header: 'ID', key: 'id', width: 20 },
      { header: '分数', key: 'score', width: 30 },
      { header: '答题人', key: 'answerer', width: 30 },
      { header: '试卷', key: 'exam', width: 30 },
      { header: '创建时间', key: 'createAt', width: 30 },
    ];

    const res = list.map((item) => ({
      id: item.id,
      score: item.score,
      answerer: item.answerer.username,
      exam: item.exam.name,
      createAt: item.createdAt,
    }));

    return await this.excelService.export(
      columns,
      res,
      `answer_${examId}.xlsx`,
    );
  }
}
