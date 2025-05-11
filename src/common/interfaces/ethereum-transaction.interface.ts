export interface EthereumTransaction {
  data: {
    result: {
      hash: string;
      to: string;
      from: string;
      value: string;
      input: string;
      maxFeePerGas: string;
      maxPriotityFeePerGas: string;
      gasPrice: string;
    };
  };
}
