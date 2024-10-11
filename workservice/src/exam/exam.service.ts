import { PrismaService } from 'src/prisma/prisma.service';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ExamAddDto } from './dto/exam-add.dto';
import { ExamSaveDto } from './dto/exam-save.dto';
import { Prisma } from '@prisma/client';
import { ExamPublishDto } from './dto/exam-publish.dto';

@Injectable()
export class ExamService {
  getHello(): string {
    return 'Hello World!';
  }

  @Inject(PrismaService)
  private prismaService: PrismaService;

  async add(dto: ExamAddDto, userId: number) {
    return await this.prismaService.exam.create({
      data: {
        name: dto.name,
        content: '',
        createUser: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }

  async list(userId: number, bin: string) {
    return await this.prismaService.exam.findMany({
      where:
        bin !== undefined
          ? {
              createUserId: userId,
              isDeleted: !bin,
            }
          : {
              createUserId: userId,
            },
    });
  }

  async listByStudent(userId: number) {
    return await this.prismaService.exam.findMany({
      where: {
        isPublished: true,
        examsUser: {
          some: {
            userId,
          }
        }
      },
    });
  }

  async del(id: number) {
    const exam = await this.find(id);
    if(exam.isPublished) {
      throw new HttpException('已发布试卷不能删除', HttpStatus.BAD_REQUEST);
    }

    return await this.prismaService.exam.update({
      where: {
        id,
      },
      data: {
        isDeleted: true,
      },
    });
  }

  async save(dto: ExamSaveDto) {
    if (!dto.content) {
      throw new HttpException('请先完善试卷内容', HttpStatus.BAD_REQUEST);
    }

    const content: any[] = JSON.parse(dto.content);
    if(!content.length) {
      throw new HttpException('试卷不能没有题目', HttpStatus.BAD_REQUEST);
    }

    const examQuestions: Prisma.ExamQuestionUncheckedCreateInput[] = [];
    for(const item of content) {
      if(item.id) {
        examQuestions.push({
          examId: dto.id,
          questionId: item.id,
        })
      }
    }

    await this.prismaService.examQuestion.createMany({
      data: examQuestions,
      skipDuplicates: true,
    })

    return await this.prismaService.exam.update({
      where: {
        id: dto.id,
      },
      data: {
        content: dto.content,
      },
    });
  }

  async publish(dto: ExamPublishDto) {
    const exam = await this.find(dto.examId);
    if(!exam.content) {
      throw new HttpException('请先完善试卷内容', HttpStatus.BAD_REQUEST);
    }

    const existingExamUsers = await this.prismaService.examUser.findFirst({
      where: {
        examId: dto.examId
      }
    })

    if(existingExamUsers) {
      await this.prismaService.examUser.deleteMany({
        where: {
          examId: dto.examId
        }
      })
    }

    const examUsers: Prisma.ExamUserUncheckedCreateInput[] = [];
    for(const userId of dto.userIds) {
      examUsers.push({
        examId: dto.examId,
        userId,
      })
    }
    await this.prismaService.examUser.createMany({
      data: examUsers,
      skipDuplicates: true,
    })

    return await this.prismaService.exam.update({
      where: {
        id: dto.examId,
        examsUser: {}
      },
      data: {
        isPublished: true,
      },
    });
  }

  async unpublish(id: number) {
    return await this.prismaService.exam.update({
      where: {
        id,
      },
      data: {
        isPublished: false,
      },
    });
  }

  async find(id: number) {
    return await this.prismaService.exam.findUnique({
      where: {
        id,
      },
    });
  }
}
