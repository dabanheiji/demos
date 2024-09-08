import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { EmailModule } from './email/email.module';
import { RedisModule } from './redis/redis.module';
import { ExamModule } from './exam/exam.module';
import { CommonModule } from './common/common.module';
import { AnswerModule } from './answer/answer.module';
import { ExcelModule } from './excel/excel.module';
import { AnalyseModule } from './analyse/analyse.module';

@Module({
  imports: [
    PrismaModule,
    UserModule,
    EmailModule,
    RedisModule,
    ExamModule,
    CommonModule,
    AnswerModule,
    ExcelModule,
    AnalyseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
