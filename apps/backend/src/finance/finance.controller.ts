import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { FinanceService } from './finance.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Finance')
@ApiBearerAuth()
@Controller('finance')
export class FinanceController {
  constructor(private readonly financeService: FinanceService) {}

  @Post('payments')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Record a payment' })
  async recordPayment(@Body() body: { studentId: string; amount: number; type: string; receiptNo: string }) {
    return this.financeService.recordPayment(body.studentId, body.amount, body.type, body.receiptNo);
  }

  @Get('payments/:studentId')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get payment history for student' })
  async getPaymentsByStudent(@Param('studentId') studentId: string) {
    return this.financeService.getPaymentsByStudent(studentId);
  }

  @Get('outstanding')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'List outstanding balances' })
  async getOutstandingBalances() {
    return this.financeService.getOutstandingBalances();
  }
}
