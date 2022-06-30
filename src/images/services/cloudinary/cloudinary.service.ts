import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { v2 } from 'cloudinary';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class CloudinaryService implements OnModuleInit {
  private readonly logger = new Logger(CloudinaryService.name);

  async onModuleInit() {
    const { CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, CLOUDINARY_CLOUD_NAME } =
      process.env;

    if (!CLOUDINARY_API_KEY) {
      this.logger.error('==> CLOUDINARY_API_KEY missing');
      process.exit(1);
    }

    if (!CLOUDINARY_API_SECRET) {
      this.logger.error('==> CLOUDINARY_API_SECRET missing');
      process.exit(1);
    }

    if (!CLOUDINARY_CLOUD_NAME) {
      this.logger.error('==> CLOUDINARY_CLOUD_NAME missing');
      process.exit(1);
    }

    v2.config({
      cloud_name: CLOUDINARY_CLOUD_NAME,
      api_key: CLOUDINARY_API_KEY,
      api_secret: CLOUDINARY_API_SECRET,
    });
  }

  getUploadBaseUrl(): string {
    return v2.utils.api_url();
  }

  async uploadFile(fileUrl: string): Promise<string> {
    const uploadRes = await v2.uploader.upload(fileUrl);

    return uploadRes.url;
  }
}
