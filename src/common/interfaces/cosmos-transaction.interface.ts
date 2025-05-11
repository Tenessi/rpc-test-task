export interface CosmosTxResponse {
  tx_response: any;
}

export interface EventAttribute {
  key: string;
  value: string;
}

export interface Event {
  type: string;
  attributes: EventAttribute[];
}

export interface TxResult {
  gas_used: string;
  gas_wanted: string;
  events: Event[];
}

export interface CosmosTransaction {
  data: {
    result: {
      hash: string;
      height: number;
      time: string;
      tx_result: TxResult;
    };
  };
}
