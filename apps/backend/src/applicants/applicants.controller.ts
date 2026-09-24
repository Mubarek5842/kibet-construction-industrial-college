import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { ApplicantsService } from './applicants.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Applicants')
@ApiBearerAuth()
@Controller('applicants')
export class ApplicantsController {
  constructor(private readonly applicantsService: ApplicantsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create applicant profile' })
  @ApiBody({ schema: { type: 'object' } })
  async createApplicant(@Body() body: any) {
    return this.applicantsService.createApplicant(body);
  }

  @Get(':userId')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get applicant by user id' })
  async findByUserId(@Param('userId') userId: string) {
    return this.applicantsService.findByUserId(userId);
  }
}
