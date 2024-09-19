import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/auth.guard';
import { RedisModule } from 'src/redis/redis.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports: [RedisModule, PrismaModule, CommonModule],
  controllers: [QuestionController],
  providers: [QuestionService, {
    provide: APP_GUARD,
    useClass: AuthGuard
  }],
})
export class QuestionModule {}
