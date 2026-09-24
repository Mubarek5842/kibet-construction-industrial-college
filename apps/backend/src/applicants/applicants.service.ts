import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { randomUUID } from 'crypto';

@Injectable()
export class ApplicantsService {
  constructor(private readonly prisma: PrismaService) {}

  async createApplicant(data: any) {
    const admissionId = `ADM-${Date.now().toString().slice(-6)}`;

    const user = await this.prisma.user.create({
      data: {
        email: data.email,
        phone: data.phone,
        passwordHash: data.passwordHash,
        role: 'APPLICANT',
        status: 'ACTIVE'
      }
    });

    const applicant = await this.prisma.applicant.create({
      data: {
        userId: user.id,
        fullName: data.fullName,
        gender: data.gender,
        dob: new Date(data.dob),
        address: data.address,
        specialNeeds: data.specialNeeds ?? null,
        admissionId
      }
    });

    return { applicant, admissionId };
  }

  async findByUserId(userId: string) {
    return this.prisma.applicant.findUnique({
      where: { userId }
    });
  }
}
