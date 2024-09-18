import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { QuestionAddDto } from './dto/question-add.dto';
import { QuestionSearchDto } from './dto/question-search.dto';

@Injectable()
export class QuestionService {
    @Inject(PrismaService)
    private prismaService: PrismaService;

    async add(dto: QuestionAddDto, username: string) {
        return await this.prismaService.question.create({
            data: {
                ...dto,
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
}
