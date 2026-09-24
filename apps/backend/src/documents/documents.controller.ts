import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { DocumentsService } from './documents.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Documents')
@ApiBearerAuth()
@Controller('documents')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Upload a document for an application' })
  @ApiBody({ schema: { type: 'object' } })
  async uploadDocument(@Body() body: any) {
    return this.documentsService.uploadDocument(body);
  }

  @Get('application/:applicationId')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get documents for an application' })
  async listByApplication(@Param('applicationId') applicationId: string) {
    return this.documentsService.listByApplication(applicationId);
  }
}
