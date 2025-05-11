export interface CosmosBlock {
  data: {
    result: {
      block_id: {
        hash: string;
      };
      block: {
        header: {
          height: string;
          time: string;
          proposer_address: string;
        };
      };
    };
  };
}
