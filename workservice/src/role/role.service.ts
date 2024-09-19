import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RoleAddDto } from './dto/role-add.dto';
import { RoleUpdateDto } from './dto/role-update.dto';

@Injectable()
export class RoleService {
    @Inject(PrismaService)
    private prismaService: PrismaService;

    async add(dto: RoleAddDto) {
        const role = await this.findOneByCode(dto.code);
        if(role) {
            throw new HttpException('角色已存在', HttpStatus.BAD_REQUEST);
        }

        return await this.prismaService.role.create({
            data: dto
        })
    }

    async findOneByCode(code: string) {
        return await this.prismaService.role.findFirst({
            where: {
                code
            }
        })
    }

    async update(dto: RoleUpdateDto) {
        return await this.prismaService.role.update({
            where: {
                id: dto.id
            },
            data: dto
        })
    }

    async delete(id: number) {
        return await this.prismaService.role.delete({
            where: {
                id
            }
        })
    }

    async list() {
        return await this.prismaService.role.findMany();
    }
}
