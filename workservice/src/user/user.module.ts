import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { EmailModule } from 'src/email/email.module';
import { CommonModule } from 'src/common/common.module';
import { AuthGuard } from 'src/auth.guard';

@Module({
  imports: [PrismaModule, EmailModule, CommonModule],
  controllers: [UserController],
  providers: [UserService, AuthGuard],
})
export class UserModule {}
