import { Controller, Post, Body, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { ApplicationsService } from './applications.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Applications')
@ApiBearerAuth()
@Controller('applications')
export class ApplicationsController {
  constructor(private readonly applicationsService: ApplicationsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Submit new application' })
  @ApiBody({ schema: { type: 'object' } })
  async createApplication(@Body() body: any) {
    return this.applicationsService.createApplication(body);
  }

  @Get('applicant/:applicantId')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'List applications for applicant' })
  async getByApplicant(@Param('applicantId') applicantId: string) {
    return this.applicationsService.getByApplicant(applicantId);
  }

  @Get('track')
  @ApiOperation({ summary: 'Track application by admission ID and phone number' })
  async trackByAdmission(@Query('admissionId') admissionId: string, @Query('phone') phone: string) {
    return this.applicationsService.trackByAdmission(admissionId, phone);
  }
}
