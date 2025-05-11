import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class EthereumHashValidationPipe implements PipeTransform {
  transform(value: string) {
    if (!value.startsWith('0x')) {
      throw new BadRequestException('Параметр должен начинаться с "0x"');
    }

    if (value.length !== 66) {
      throw new BadRequestException('Параметр должен иметь 64 символа после "0x"');
    }

    return value;
  }
}
