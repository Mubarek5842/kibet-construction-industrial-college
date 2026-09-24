import { Controller, Get, Param, Res, NotFoundException } from '@nestjs/common';
import { Response } from 'express';
import { StorageService } from './storage.service';

@Controller('storage')
export class StorageController {
  constructor(private readonly storage: StorageService) {}
  @Get('*')
  async get(@Param() params: { '0': string }, @Res() response: Response) { try { const key = params['0']; const file = await this.storage.read(key); response.send(file); } catch { throw new NotFoundException('File not found'); } }
}
