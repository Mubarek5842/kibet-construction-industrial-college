import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { HealthController } from './common/health/health.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ApplicantsModule } from './applicants/applicants.module';
import { ApplicationsModule } from './applications/applications.module';
import { DocumentsModule } from './documents/documents.module';
import { AdmissionsModule } from './admissions/admissions.module';
import { StudentRegistrationModule } from './student-registration/student-registration.module';
import { FinanceModule } from './finance/finance.module';
import { AcademicsModule } from './academics/academics.module';
import { PoliciesModule } from './policies/policies.module';
import { ReportsModule } from './reports/reports.module';
import { StorageModule } from './storage/storage.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    PrismaModule,
    StorageModule,
    AuthModule,
    UsersModule,
    ApplicantsModule,
    ApplicationsModule,
    DocumentsModule,
    AdmissionsModule,
    StudentRegistrationModule,
    FinanceModule,
    AcademicsModule,
    PoliciesModule,
    ReportsModule
  ],
  controllers: [HealthController]
})
export class AppModule {}
