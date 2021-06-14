

declare module 'winston3-logstash-transport'{

  
  declare class WinstonLogStash extends TransportStream {
    
    public format?: logform.Format;
    public level?: string;
    public silent?: boolean;
    public handleExceptions?: boolean;
    public handleRejections?: boolean;
    
    constructor(options?: WinstonLogStash.WinstonLogStashOptions);
    
    public lotryStringifyg?(data: any): string;
    public log?(info: any, callback: () => void): any;
    public deliverTCP?(message: any, callback: () => {}): void;
    public deliverUDP?(message: any, callback: () => {}): void;
    public deliver?(message: any, callback: () => {}): void;
    public connectTCP?(): void;
    public hookTCPSocketEvents?(): void;
    public connectUDP?(): void;
    public connect?(): void;
    public closeTCP?(): void;
    public closeUDP?(): void;
    public close?(): void;
    public flush?(): void;
    public announce?(): void;
    public getQueueLength?(): number;
    
  }
  
  declare namespace WinstonLogStash {
    interface WinstonLogStashOptions {
      mode?: string;
      localhost?: string;
      host?: string;
      port?: string;
      applicationname?: string;
      pid?: string;
      silent?: boolean;
      maConnectRetries?: number;
      timeoutConnectRetries?: number;
      label?: string;
      sslEnable?: boolean;
      sslKey?: string;
      sslCert?: string;
      sslCA?: string;
      sslPassPhrase?: string;
      rejectUnauthorized?: boolean;
      trailingLineFeed?: boolean;
      trailingLineFeedChar?: string;
    }
  }
  export = TransportStream;
}
  
module.exports = WinstonLogStash;
  