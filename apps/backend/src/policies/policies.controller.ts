import { Controller, Get, Param, Put, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { PoliciesService } from './policies.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Policies')
@ApiBearerAuth()
@Controller('policies')
export class PoliciesController {
  constructor(private readonly policiesService: PoliciesService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'List all configurable academic and admissions policies' })
  async listPolicies() {
    return this.policiesService.listPolicies();
  }

  @Get(':key')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get policy by key' })
  async getPolicy(@Param('key') key: string) {
    return this.policiesService.getPolicy(key);
  }

  @Put(':key')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create or update a policy value' })
  async upsertPolicy(@Param('key') key: string, @Body() body: { value: string; description?: string }) {
    return this.policiesService.upsertPolicy(key, body.value, body.description);
  }
}
