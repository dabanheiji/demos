import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { QuestionAddDto } from './dto/question-add.dto';
import { QuestionSearchDto } from './dto/question-search.dto';
import { QuestionUpdateDto } from './dto/question-update.dto';

@Injectable()
export class QuestionService {
    @Inject(PrismaService)
    private prismaService: PrismaService;

    async add(dto: QuestionAddDto, username: string) {
        return await this.prismaService.question.create({
            data: {
                ...dto,
                options: JSON.stringify(dto.options),
                createdBy: username,
                updatedBy: username,
            }
        })
    }

    async list(dto: QuestionSearchDto) {
        const where = {}
        const query = {
            content: dto.content,
            type: dto.type,
        }

        if(Object.values(query).some(v => v)) {
            Object.entries(query).forEach(([k, v]) => {
                where[k] = {
                    contains: v,
                    mode: 'insensitive'
                }
            })
        }

        const list = await this.prismaService.question.findMany({
            skip: dto.pageNo,
            take: dto.pageSize,
            where,
            orderBy: {
                updatedAt: 'desc'
            }
        })

        const total = await this.prismaService.question.count({
            where,
        })

        return {
            list,
            total
        }
    }

    async update(dto: QuestionUpdateDto, username: string) {
        return await this.prismaService.question.update({
            where: {
                id: dto.id
            },
            data: {
                ...dto,
                options: JSON.stringify(dto.options),
                updatedBy: username,
            }
        })
    }

    async detete(id: number) {
        const exams = await this.findExams(id);

        if(exams.length > 0) {
            throw new HttpException('该题目已被使用，无法删除', HttpStatus.BAD_REQUEST)
        }

        return await this.prismaService.question.delete({
            where: {
                id
            }
        })
    }

    async find(id: number) {
        return await this.prismaService.question.findUnique({
            where: {
                id
            }
        })
    }

    async findExams(id: number) {
        const emamIds = await this.prismaService.examQuestion.findMany({
            where: {
                questionId: id
            },
            select: {
                examId: true
            }
        })

        return await this.prismaService.exam.findMany({
            where: {
                id: {
                    in: emamIds.map(v => v.examId)
                },
                isDeleted: false,
            }
        })
    }
}
