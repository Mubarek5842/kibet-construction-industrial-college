import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AcademicsService } from './academics.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Academics')
@ApiBearerAuth()
@Controller('academics')
export class AcademicsController {
  constructor(private readonly academicsService: AcademicsService) {}

  @Post('enrollments')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Register a student for a course' })
  async registerCourse(@Body() body: { studentId: string; courseId: string; semester: string }) {
    return this.academicsService.registerCourse(body.studentId, body.courseId, body.semester);
  }

  @Get('enrollments/:studentId')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'List course registrations for a student' })
  async getCourseEnrollments(@Param('studentId') studentId: string) {
    return this.academicsService.getCourseEnrollments(studentId);
  }

  @Post('attendance')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Record attendance' })
  async recordAttendance(@Body() body: { studentId: string; courseId: string; date: string; status: string }) {
    return this.academicsService.recordAttendance(body.studentId, body.courseId, body.date, body.status);
  }

  @Get('attendance/:studentId')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get attendance details for a student' })
  async getAttendance(@Param('studentId') studentId: string) {
    return this.academicsService.getAttendance(studentId);
  }
}
