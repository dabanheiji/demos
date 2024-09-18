import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/auth.guard';

@Module({
  controllers: [QuestionController],
  providers: [QuestionService, {
    provide: APP_GUARD,
    useClass: AuthGuard
  }],
})
export class QuestionModule {}
