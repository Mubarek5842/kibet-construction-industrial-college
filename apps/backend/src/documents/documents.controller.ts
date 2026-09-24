import { Controller, Get, Param, Post, Body, UploadedFile, UseGuards, UseInterceptors, BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { DocumentsService } from './documents.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Documents')
@ApiBearerAuth()
@Controller('documents')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Post('upload')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file', { limits: { fileSize: 5 * 1024 * 1024 } }))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Upload an application document (maximum 5 MB)' })
  async upload(@UploadedFile() file: Express.Multer.File, @Body() body: { applicationId: string; type: string }) {
    if (!file) throw new BadRequestException('A file is required');
    return this.documentsService.uploadFile(body.applicationId, body.type, file);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() body: { applicationId: string; type: string; fileUrl: string }) {
    return this.documentsService.uploadDocument(body);
  }

  @Get('application/:applicationId')
  @UseGuards(JwtAuthGuard)
  async listByApplication(@Param('applicationId') applicationId: string) {
    return this.documentsService.listByApplication(applicationId);
  }
}
