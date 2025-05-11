import { Controller, Get, HttpCode, Param } from '@nestjs/common';
import { EthereumService } from './ethereum.service';
import { EthereumBlockResponseDto } from './dto/block-response.dto';
import { EthereumTransactionResponseDto } from './dto/transaction-response.dto';

@Controller('evm')
export class EthereumController {
  constructor(private readonly ethereumService: EthereumService) {}

  @Get('block/:height')
  @HttpCode(200)
  async getBlockByNumber(@Param('height') height: string): Promise<EthereumBlockResponseDto> {
    return await this.ethereumService.getBlockByNumber(height);
  }

  @Get('transactions/:hash')
  @HttpCode(200)
  async getTransactionByHash(@Param('hash') hash: string): Promise<EthereumTransactionResponseDto> {
    return await this.ethereumService.getTransactionByHash(hash);
  }
}
