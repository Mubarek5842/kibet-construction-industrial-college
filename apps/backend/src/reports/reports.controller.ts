import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ReportsService } from './reports.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Reports')
@ApiBearerAuth()
@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('summary')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get dashboard summary for admin and registrar' })
  async getDashboardSummary() {
    return this.reportsService.getDashboardSummary();
  }

  @Get('students-by-program')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Break down student counts by program' })
  async getStudentsByProgram() {
    return this.reportsService.getStudentsByProgram();
  }
}
