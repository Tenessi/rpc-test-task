import { BadRequestException, Injectable } from '@nestjs/common';
import axios from 'axios';
import { CosmosTransactionResponseDto } from './dto/transaction-response.dto';
import { ConfigService } from '@nestjs/config';
import { CosmosBlock } from 'src/common/interfaces/cosmos-block.interface';
import { CosmosBlockResponseDto } from './dto/block-response.dto';
import { CosmosTransaction } from 'src/common/interfaces/cosmos-transaction.interface';

@Injectable()
export class CosmosService {
  constructor(private readonly configService: ConfigService) {}
  private readonly cosmosUrl = this.configService.getOrThrow<string>('cosmosRpcUrl');

  async getBlockByNumber(number: number): Promise<CosmosBlockResponseDto> {
    try {
      const response: CosmosBlock = await axios.get(`${this.cosmosUrl}/block`, {
        params: { number },
      });

      const { hash } = response.data.result.block_id;
      const { height, time, proposer_address } = response.data.result.block.header;

      return {
        height,
        time,
        hash,
        proposedAddres: proposer_address,
      };
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async getTransactionByHash(paramHash: string): Promise<CosmosTransactionResponseDto> {
    try {
      const response: CosmosTransaction = await axios.get(this.cosmosUrl + '/tx', {
        params: {
          hash: '0x' + paramHash,
        },
      });
      const feeEvent = response.data.result.tx_result.events.find((ev) => ev.type === 'fee_pay');
      const fee = feeEvent?.attributes.find((attr) => attr.key === 'fee')?.value || null;

      const senders: string[] = [];

      response.data.result.tx_result.events.forEach((event) => {
        event.attributes.forEach((a) => {
          if (a.key === 'sender') {
            senders.push(a.value);
          }
        });
      });

      const { hash, height, time } = response.data.result;
      const { gas_used, gas_wanted } = response.data.result.tx_result;

      return {
        hash,
        height,
        time: time || null,
        gasUsed: gas_used,
        gasWanted: gas_wanted,
        fee: fee,
        sender: senders,
      };
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}
