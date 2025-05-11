import { Controller, Get, HttpCode, Param, UsePipes } from '@nestjs/common';
import { CosmosService } from './cosmos.service';
import { CosmosTransactionResponseDto } from './dto/transaction-response.dto';
import { CosmosBlockResponseDto } from './dto/block-response.dto';
import { CosmosHashValidationPipe } from 'src/common/pipes/cosmos-hash-validation.pipe';
import { ParseStringNumberPipe } from 'src/common/pipes/parse-string-number.pipe';

@Controller('cosmos')
export class CosmosController {
  constructor(private readonly cosmosService: CosmosService) {}

  @Get('/block/:height')
  @UsePipes(ParseStringNumberPipe)
  @HttpCode(200)
  async getBlockByNumber(@Param('height') height: number): Promise<CosmosBlockResponseDto> {
    return await this.cosmosService.getBlockByNumber(height);
  }

  @Get('transactions/:hash')
  @UsePipes(CosmosHashValidationPipe)
  @HttpCode(200)
  async getTransactionsByHash(@Param('hash') hash: string): Promise<CosmosTransactionResponseDto> {
    return await this.cosmosService.getTransactionByHash(hash);
  }
}
