import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FinanceService {
  constructor(private readonly prisma: PrismaService) {}

  async recordPayment(studentId: string, amount: number, type: string, receiptNo: string) {
    return this.prisma.payment.create({
      data: {
        studentId,
        amount,
        type: type as any,
        receiptNo
      }
    });
  }

  async getPaymentsByStudent(studentId: string) {
    return this.prisma.payment.findMany({
      where: { studentId },
      orderBy: { date: 'desc' }
    });
  }

  async getOutstandingBalances() {
    const students = await this.prisma.student.findMany();

    const result = [] as any[];
    for (const student of students) {
      const payments = await this.prisma.payment.aggregate({
        where: { studentId: student.id },
        _sum: { amount: true }
      });

      const totalPaid = Number(payments._sum.amount ?? 0);
      const outstanding = Math.max(0, 150 - totalPaid);

      result.push({
        studentId: student.id,
        registrationNo: student.registrationNo,
        totalPaid,
        outstanding
      });
    }

    return result;
  }
}
