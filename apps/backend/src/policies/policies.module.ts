import { Module } from '@nestjs/common';
import { PoliciesController } from './policies.controller';
import { PoliciesService } from './policies.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [PoliciesController],
  providers: [PoliciesService, PrismaService]
})
export class PoliciesModule {}
