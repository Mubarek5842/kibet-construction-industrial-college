import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DocumentsService {
  constructor(private readonly prisma: PrismaService) {}

  async uploadDocument(data: any) {
    return this.prisma.document.create({
      data: {
        applicationId: data.applicationId,
        type: data.type,
        fileUrl: data.fileUrl,
        verified: false
      }
    });
  }

  async listByApplication(applicationId: string) {
    return this.prisma.document.findMany({
      where: { applicationId }
    });
  }
}
