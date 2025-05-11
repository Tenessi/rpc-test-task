import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class CosmosHashValidationPipe implements PipeTransform {
  transform(value: string) {
    if (value.length !== 64) {
      throw new BadRequestException('Параметр должен иметь 64 символа');
    }

    return value;
  }
}
