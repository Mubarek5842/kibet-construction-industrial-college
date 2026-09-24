import { Module } from '@nestjs/common';
import { AcademicsController } from './academics.controller';
import { AcademicsService } from './academics.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [AcademicsController],
  providers: [AcademicsService, PrismaService]
})
export class AcademicsModule {}
