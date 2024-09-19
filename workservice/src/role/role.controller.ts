import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { RoleService } from './role.service';
import { RequireLogin } from 'src/custom.decorator';
import { RoleAddDto } from './dto/role-add.dto';
import { RoleUpdateDto } from './dto/role-update.dto';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get('list')
  @RequireLogin()
  async list() {
    return await this.roleService.list();
  }

  @Post('add')
  @RequireLogin()
  async add(@Body() dto: RoleAddDto) {
    return await this.roleService.add(dto);
  }

  @Post('update')
  @RequireLogin()
  async update(@Body() dto: RoleUpdateDto) {
    return await this.roleService.update(dto);
  }

  @Delete('delete/:id')
  @RequireLogin()
  async delete(@Param('id') id: string) {
    return await this.roleService.delete(+id);
  }
}
