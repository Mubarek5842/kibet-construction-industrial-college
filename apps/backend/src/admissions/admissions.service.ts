import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AdmissionsService {
  constructor(private readonly prisma: PrismaService) {}

  async listApplicationsForReview() {
    return this.prisma.application.findMany({
      where: {
        OR: [{ status: 'SUBMITTED' }, { status: 'UNDER_REVIEW' }]
      },
      include: {
        applicant: true,
        documents: true
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  async verifyDocument(applicationId: string, documentId: string, verifiedByUserId: string) {
    const doc = await this.prisma.document.findFirst({
      where: { id: documentId, applicationId }
    });

    if (!doc) {
      throw new Error('Document not found');
    }

    return this.prisma.document.update({
      where: { id: documentId },
      data: {
        verified: true,
        verifiedById: verifiedByUserId
      }
    });
  }

  async updateApplicationStatus(applicationId: string, status: string) {
    return this.prisma.application.update({
      where: { id: applicationId },
      data: {
        status: status as any
      }
    });
  }

  async computePlacementCandidates() {
    const applications = await this.prisma.application.findMany({
      where: { status: 'ELIGIBLE' },
      include: { applicant: true }
    });

    return applications.map((app) => ({
      id: app.id,
      applicantId: app.applicantId,
      fullName: app.applicant.fullName,
      score: app.eslceScore ?? 0,
      preference: app.preferences,
      status: app.status
    }));
  }
}
