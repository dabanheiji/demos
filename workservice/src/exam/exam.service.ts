import { PrismaService } from 'src/prisma/prisma.service';
import { Inject, Injectable } from '@nestjs/common';
import { ExamAddDto } from './dto/exam-add.dto';
import { ExamSaveDto } from './dto/exam-save.dto';

@Injectable()
export class ExamService {
  getHello(): string {
    return 'Hello World!';
  }

  @Inject(PrismaService)
  private prismaService: PrismaService;

  async add(dto: ExamAddDto, userId: number) {
    console.log(dto, userId);
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
              isDeleted: true,
            }
          : {
              createUserId: userId,
            },
    });
  }

  async del(userId: number, id: number) {
    return await this.prismaService.exam.update({
      where: {
        id,
        createUserId: userId,
      },
      data: {
        isDeleted: true,
      },
    });
  }

  async save(dto: ExamSaveDto) {
    return await this.prismaService.exam.update({
      where: {
        id: dto.id,
      },
      data: {
        content: dto.content,
      },
    });
  }

  async publish(userId: number, id: number) {
    return await this.prismaService.exam.update({
      where: {
        id,
        createUserId: userId,
      },
      data: {
        isPublished: true,
      },
    });
  }

  async unpublish(userId: number, id: number) {
    return await this.prismaService.exam.update({
      where: {
        id,
        createUserId: userId,
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
