import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { mkdir, writeFile, readFile } from 'fs/promises';
import { join, normalize } from 'path';
import { randomUUID } from 'crypto';

@Injectable()
export class StorageService {
  private readonly root: string;

  constructor(private readonly config: ConfigService) {
    this.root = normalize(config.get<string>('UPLOAD_DIR') || join(process.cwd(), 'uploads'));
  }

  async save(file: { originalname: string; mimetype: string; buffer: Buffer }) {
    const extension = file.originalname.includes('.') ? file.originalname.slice(file.originalname.lastIndexOf('.')).toLowerCase() : '';
    const relativePath = join(new Date().toISOString().slice(0, 10), `${randomUUID()}${extension}`);
    const absolutePath = join(this.root, relativePath);
    await mkdir(join(this.root, new Date().toISOString().slice(0, 10)), { recursive: true });
    await writeFile(absolutePath, file.buffer, { flag: 'wx' });
    return { key: relativePath.replaceAll('\\', '/'), url: `/storage/${relativePath.replaceAll('\\', '/')}` };
  }

  async read(key: string) {
    const safeKey = normalize(key).replace(/^([.][.][/\\])+/, '');
    return readFile(join(this.root, safeKey));
  }
}
