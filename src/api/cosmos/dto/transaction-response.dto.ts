export class CosmosTransactionResponseDto {
  hash: string;
  height: number;
  time: string | null;
  gasUsed: string;
  gasWanted: string;
  fee: string | null;
  sender: string[];
}
