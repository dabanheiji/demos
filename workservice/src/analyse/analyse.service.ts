import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class AnalyseService {
  @Inject(PrismaService)
  private prismaService: PrismaService;

  @Inject(RedisService)
  private redisService: RedisService;

  async ranking(examId: number) {
    const answers = await this.prismaService.answer.findMany({
      where: {
        examId,
      },
    });

    for (let i = 0; i < answers.length; i++) {
      await this.redisService.zAdd(`ranking:${examId}`, {
        [answers[i].id]: answers[i].score,
      });
    }

    const ids = await this.redisService.zRankingList(
      `ranking:${examId}`,
      0,
      10,
    );

    const res = [];
    for (let i = 0; i < ids.length; i++) {
      const answer = await this.prismaService.answer.findUnique({
        where: {
          id: +ids[i],
        },
        include: {
          answerer: true,
          exam: true,
        },
      });
      res.push(answer);
    }

    return res;
  }
}
