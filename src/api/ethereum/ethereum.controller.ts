import { Controller, Get, HttpCode, Param, UsePipes } from '@nestjs/common';
import { EthereumService } from './ethereum.service';
import { EthereumBlockResponseDto } from './dto/block-response.dto';
import { EthereumTransactionResponseDto } from './dto/transaction-response.dto';
import { EthereumHashValidationPipe } from 'src/common/pipes/ethereum-hash-validation.pipe';
import { ParseStringNumberPipe } from 'src/common/pipes/parse-string-number.pipe';

@Controller('evm')
export class EthereumController {
  constructor(private readonly ethereumService: EthereumService) {}

  @Get('block/:height')
  @UsePipes(ParseStringNumberPipe)
  @HttpCode(200)
  async getBlockByNumber(@Param('height') height: string): Promise<EthereumBlockResponseDto> {
    return await this.ethereumService.getBlockByNumber(height);
  }

  @Get('transactions/:hash')
  @UsePipes(EthereumHashValidationPipe)
  @HttpCode(200)
  async getTransactionByHash(@Param('hash') hash: string): Promise<EthereumTransactionResponseDto> {
    return await this.ethereumService.getTransactionByHash(hash);
  }
}
