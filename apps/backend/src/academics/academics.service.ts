import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AcademicsService {
  constructor(private readonly prisma: PrismaService) {}

  async registerCourse(studentId: string, courseId: string, semester: string) {
    return this.prisma.enrollment.create({
      data: {
        studentId,
        courseId,
        semester,
        status: 'REGISTERED'
      }
    });
  }

  async getCourseEnrollments(studentId: string) {
    return this.prisma.enrollment.findMany({
      where: { studentId },
      include: { course: true }
    });
  }

  async recordAttendance(studentId: string, courseId: string, date: string, status: string) {
    return this.prisma.attendance.create({
      data: {
        studentId,
        courseId,
        date: new Date(date),
        status: status as any
      }
    });
  }

  async getAttendance(studentId: string) {
    return this.prisma.attendance.findMany({
      where: { studentId },
      include: { course: true }
    });
  }
}
