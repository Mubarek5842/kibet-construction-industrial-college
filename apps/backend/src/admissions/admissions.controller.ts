import { Controller, Get, Patch, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { AdmissionsService } from './admissions.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Admissions')
@ApiBearerAuth()
@Controller('admissions')
export class AdmissionsController {
  constructor(private readonly admissionsService: AdmissionsService) {}

  @Get('review')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'List applications requiring clearance or review' })
  async listApplicationsForReview() {
    return this.admissionsService.listApplicationsForReview();
  }

  @Patch('documents/:applicationId/:documentId/verify')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Verify an application document' })
  async verifyDocument(
    @Param('applicationId') applicationId: string,
    @Param('documentId') documentId: string,
    @Body() body: { verifiedByUserId: string }
  ) {
    return this.admissionsService.verifyDocument(applicationId, documentId, body.verifiedByUserId);
  }

  @Patch('applications/:applicationId/status')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update application status' })
  async updateApplicationStatus(@Param('applicationId') applicationId: string, @Body() body: { status: string }) {
    return this.admissionsService.updateApplicationStatus(applicationId, body.status);
  }

  @Get('placements/candidates')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get eligible placement candidates' })
  async computePlacementCandidates() {
    return this.admissionsService.computePlacementCandidates();
  }
}
