import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ReportsService {
  constructor(private readonly prisma: PrismaService) {}

  async getDashboardSummary() {
    const [studentCount, applicantCount, finance, admissions] = await Promise.all([
      this.prisma.student.count(),
      this.prisma.applicant.count(),
      this.prisma.payment.aggregate({ _sum: { amount: true } }),
      this.prisma.application.groupBy({
        by: ['status'],
        _count: true
      })
    ]);

    return {
      studentCount,
      applicantCount,
      totalFeeCollection: Number(finance._sum.amount ?? 0),
      admissionsByStatus: admissions.map((entry) => ({
        status: entry.status,
        count: entry._count
      }))
    };
  }

  async getStudentsByProgram() {
    return this.prisma.student.groupBy({
      by: ['programId'],
      _count: { id: true }
    });
  }
}
