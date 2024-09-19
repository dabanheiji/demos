import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { RedisModule } from 'src/redis/redis.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CommonModule } from 'src/common/common.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/auth.guard';

@Module({
  imports: [RedisModule, PrismaModule, CommonModule],
  controllers: [RoleController],
  providers: [RoleService, {
    provide: APP_GUARD,
    useClass: AuthGuard,
  }],
})
export class RoleModule {}
