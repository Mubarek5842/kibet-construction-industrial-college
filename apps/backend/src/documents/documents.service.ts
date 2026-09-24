import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { StorageService } from '../storage/storage.service';

@Injectable()
export class DocumentsService {
  constructor(private readonly prisma: PrismaService, private readonly storage: StorageService) {}

  async uploadFile(applicationId: string, type: string, file: Express.Multer.File) {
    const stored = await this.storage.save(file);
    return this.prisma.document.create({
      data: { applicationId, type: type as any, fileUrl: stored.url, verified: false }
    });
  }

  async uploadDocument(data: { applicationId: string; type: string; fileUrl: string }) {
    return this.prisma.document.create({
      data: { applicationId: data.applicationId, type: data.type as any, fileUrl: data.fileUrl, verified: false }
    });
  }

  async listByApplication(applicationId: string) {
    return this.prisma.document.findMany({ where: { applicationId }, orderBy: { uploadedAt: 'desc' } });
  }
}
