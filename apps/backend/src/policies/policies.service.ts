import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PoliciesService {
  constructor(private readonly prisma: PrismaService) {}

  async listPolicies() {
    return this.prisma.academicPolicy.findMany({
      orderBy: { key: 'asc' }
    });
  }

  async getPolicy(key: string) {
    return this.prisma.academicPolicy.findUnique({
      where: { key }
    });
  }

  async upsertPolicy(key: string, value: string, description?: string) {
    return this.prisma.academicPolicy.upsert({
      where: { key },
      create: {
        key,
        value,
        description: description ?? null
      },
      update: {
        value,
        description: description ?? undefined
      }
    });
  }
}
