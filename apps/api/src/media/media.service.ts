import { Injectable } from '@nestjs/common';

@Injectable()
export class MediaService {
  getPresignedUploadUrl() {
    // TODO: generate Cloudflare R2 presigned URL
    return { url: '', key: crypto.randomUUID() };
  }
}
