import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ParseStringNumberPipe implements PipeTransform {
  transform(value: string) {
    if (!isNaN(Number(value))) {
      return value;
    }

    throw new BadRequestException(`Validation failed. "${value}" is not a number.`);
  }
}
