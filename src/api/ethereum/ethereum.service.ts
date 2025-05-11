import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { EthereumTransactionResponseDto } from './dto/transaction-response.dto';
import { EthereumBlockResponseDto } from './dto/block-response.dto';
import { EthereumBlock } from 'src/common/interfaces/ethereum-block.interface';
import { EthereumTransaction } from 'src/common/interfaces/ethereum-transaction.interface';

@Injectable()
export class EthereumService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  private readonly ethereumUrl = this.configService.getOrThrow<string>('evmRpcUrl');

  async getBlockByNumber(number: string): Promise<EthereumBlockResponseDto> {
    const hex = '0x' + Number(number).toString(16);

    const data = {
      jsonrpc: '2.0',
      method: 'eth_getBlockByNumber',
      params: [hex, false],
      id: 1,
    };

    const responseData: EthereumBlock = await firstValueFrom(this.httpService.post(this.ethereumUrl, data));

    const { hash, height, parentHash, gasLimit, gasUsed, size } = responseData.data.result;

    return {
      hash,
      height,
      parentHash,
      gasLimit,
      gasUsed,
      size,
    };
  }

  async getTransactionByHash(paramHash: string): Promise<EthereumTransactionResponseDto> {
    const data = {
      jsonrpc: '2.0',
      method: 'eth_getTransactionByHash',
      params: [paramHash],
      id: 1,
    };

    const responseResult: EthereumTransaction = await firstValueFrom(this.httpService.post(this.ethereumUrl, data));

    const { hash, to, from, value, input, maxFeePerGas, maxPriotityFeePerGas, gasPrice } = responseResult.data.result;

    return {
      hash,
      to,
      from,
      value,
      input,
      maxFeePerGas,
      maxPriotityFeePerGas,
      gasPrice,
    };
  }
}
