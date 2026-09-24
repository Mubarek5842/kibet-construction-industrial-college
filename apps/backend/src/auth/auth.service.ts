import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService, private readonly jwtService: JwtService) {}

  async register(dto: RegisterDto) {
    const existing = await this.prisma.user.findFirst({ where: { OR: [{ email: dto.email.toLowerCase() }, { phone: dto.phone }] } });
    if (existing) throw new ConflictException('Email or phone is already registered');
    const user = await this.prisma.user.create({
      data: { email: dto.email.toLowerCase(), phone: dto.phone, passwordHash: await bcrypt.hash(dto.password, 12), role: 'APPLICANT', status: 'ACTIVE' }
    });
    return this.issueTokens(user);
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({ where: { email: dto.email.toLowerCase() } });
    if (!user || !(await bcrypt.compare(dto.password, user.passwordHash))) throw new UnauthorizedException('Invalid credentials');
    if (user.status !== 'ACTIVE') throw new UnauthorizedException(`Account is ${user.status.toLowerCase()}`);
    return this.issueTokens(user);
  }

  private issueTokens(user: { id: string; email: string; phone: string; role: any; status: any }) {
    const payload = { sub: user.id, email: user.email, role: user.role };
    return { user: { id: user.id, email: user.email, phone: user.phone, role: user.role, status: user.status }, accessToken: this.jwtService.sign(payload), refreshToken: this.jwtService.sign(payload, { expiresIn: '7d' }) };
  }
}
