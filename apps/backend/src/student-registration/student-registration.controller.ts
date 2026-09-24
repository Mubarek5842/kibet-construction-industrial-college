import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { StudentRegistrationService } from './student-registration.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Student Registration')
@ApiBearerAuth()
@Controller('student-registration')
export class StudentRegistrationController {
  constructor(private readonly studentRegistrationService: StudentRegistrationService) {}

  @Post('convert')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Convert admitted applicant to student' })
  async createStudentFromAdmission(@Body() body: { applicantId: string; programId: string; campusId: string }) {
    return this.studentRegistrationService.createStudentFromAdmission(body.applicantId, body.programId, body.campusId);
  }

  @Get('students')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'List students' })
  async listStudents() {
    return this.studentRegistrationService.listStudents();
  }
}
