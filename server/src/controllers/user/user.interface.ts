export interface PowerSmpp {
  ErrorCode: number;
  ErrorDescription: null;
  Data: [
    {
      MessageErrorCode: number;
      MessageErrorDescription: string;
      MobileNumber: string;
      MessageId: string;
      Custom: null;
    },
  ];
}
