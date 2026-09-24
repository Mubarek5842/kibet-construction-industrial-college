import { Module } from '@nestjs/common';
import { StudentRegistrationController } from './student-registration.controller';
import { StudentRegistrationService } from './student-registration.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [StudentRegistrationController],
  providers: [StudentRegistrationService, PrismaService]
})
export class StudentRegistrationModule {}
