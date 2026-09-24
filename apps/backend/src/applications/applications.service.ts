import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ApplicationsService {
  constructor(private readonly prisma: PrismaService) {}

  async createApplication(data: any) {
    const application = await this.prisma.application.create({
      data: {
        applicantId: data.applicantId,
        programType: data.programType,
        preferences: data.preferences,
        eslceScore: data.eslceScore,
        status: 'SUBMITTED',
        submittedAt: new Date(),
        userId: data.userId
      }
    });

    return application;
  }

  async getByApplicant(applicantId: string) {
    return this.prisma.application.findMany({
      where: { applicantId },
      orderBy: { createdAt: 'desc' }
    });
  }

  async trackByAdmission(admissionId: string, phone: string) {
    const applicant = await this.prisma.applicant.findFirst({
      where: { admissionId },
      include: {
        user: true,
        applications: true
      }
    });

    if (!applicant || applicant.user.phone !== phone) {
      return null;
    }

    return {
      applicant,
      applications: applicant.applications
    };
  }
}
