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

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    }),
    PrismaModule,
    AuthModule,
    UsersModule,
    ApplicantsModule,
    ApplicationsModule,
    DocumentsModule,
    AdmissionsModule,
    StudentRegistrationModule
  ],
  controllers: [HealthController],
  providers: []
})
export class AppModule {}
