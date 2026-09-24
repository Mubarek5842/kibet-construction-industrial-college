import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { UsersService } from './users.service';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'APPLICANT', 'TRAINEE', 'REGISTRAR', 'FINANCE_OFFICER', 'DEPARTMENT_HEAD', 'SYSTEM_AUDITOR')
  @ApiOperation({ summary: 'Get current logged-in user' })
  async me(@Req() req) {
    return this.usersService.getById(req.user.id);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiOperation({ summary: 'List all users' })
  async list() {
    return this.usersService.list();
  }
}
