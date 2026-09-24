import { IsEmail, IsEnum, IsNotEmpty, IsOptional, Matches, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ example: 'applicant@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '+251912345678' })
  @Matches(/^\+?[0-9]{10,15}$/)
  phone: string;

  @ApiProperty({ example: 'StrongPassword123!' })
  @MinLength(8)
  password: string;

  @ApiProperty({ enum: ['APPLICANT', 'TRAINEE', 'REGISTRAR', 'FINANCE_OFFICER', 'DEPARTMENT_HEAD', 'ADMIN', 'SYSTEM_AUDITOR'], required: false })
  @IsOptional()
  @IsEnum(['APPLICANT', 'TRAINEE', 'REGISTRAR', 'FINANCE_OFFICER', 'DEPARTMENT_HEAD', 'ADMIN', 'SYSTEM_AUDITOR'])
  role?: string;
}
