import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class StudentRegistrationService {
  constructor(private readonly prisma: PrismaService) {}

  async createStudentFromAdmission(applicantId: string, programId: string, campusId: string) {
    const applicant = await this.prisma.applicant.findUnique({
      where: { id: applicantId },
      include: { user: true }
    });

    if (!applicant) {
      throw new Error('Applicant not found');
    }

    const registrationNo = `KCIC-${Date.now().toString().slice(-8)}`;

    const student = await this.prisma.student.create({
      data: {
        userId: applicant.userId,
        registrationNo,
        programId,
        campusId,
        level: 'Level 1',
        status: 'ACTIVE'
      }
    });

    await this.prisma.application.updateMany({
      where: { applicantId },
      data: { status: 'PLACED' }
    });

    return student;
  }

  async listStudents() {
    return this.prisma.student.findMany({
      include: {
        user: true,
        program: true,
        campus: true
      }
    });
  }
}
