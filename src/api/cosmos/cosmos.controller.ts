import { Controller, Get, HttpCode, Param } from '@nestjs/common';
import { CosmosService } from './cosmos.service';
import { CosmosTransactionResponseDto } from './dto/transaction-response.dto';
import { CosmosBlockResponseDto } from './dto/block-response.dto';

@Controller('cosmos')
export class CosmosController {
  constructor(private readonly cosmosService: CosmosService) {}

  @Get('/block/:height')
  @HttpCode(200)
  async getBlockByNumber(@Param('height') height: number): Promise<CosmosBlockResponseDto> {
    return await this.cosmosService.getBlockByNumber(height);
  }

  @Get('transactions/:hash')
  @HttpCode(200)
  async getTransactionsByHash(@Param('hash') hash: string): Promise<CosmosTransactionResponseDto> {
    return await this.cosmosService.getTransactionByHash(hash);
  }
}
