import { Module } from '@nestjs/common';
import { EthereumModule } from './ethereum/ethereum.module';
import { CosmosModule } from './cosmos/cosmos.module';

const modules = [EthereumModule, CosmosModule];

@Module({
  imports: modules,
})
export class ApiModule {}
