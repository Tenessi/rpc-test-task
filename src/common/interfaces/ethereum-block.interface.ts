export interface EthereumBlock {
  data: {
    result: {
      hash: string;
      height: string;
      parentHash: string;
      gasLimit: string;
      gasUsed: string;
      size: string;
    };
  };
}
