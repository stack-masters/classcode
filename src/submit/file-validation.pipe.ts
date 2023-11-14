// file-size-validation.pipe.ts
import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';

@Injectable()
export class FileSizeValidationPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    const file = value;
    const maxSize = 1024 * 1024 * 5; 
    if(file.mimetype != 'application/zip'){
      throw new BadRequestException("받은파일이 zip이아닌데")
    }

    if (file.size > maxSize) {
      throw new BadRequestException('File size too large');
    }
    return value;
  }
}
