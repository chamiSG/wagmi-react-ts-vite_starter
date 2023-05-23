import { PublicKey, SendOptions, Transaction, VersionedTransaction } from '@solana/web3.js';

type DisplayEncoding = 'utf8' | 'hex';

type SolanaEvent = 'connect' | 'disconnect' | 'accountChanged';

type EthereumEvent = 'connect' | 'disconnect' | 'accountsChanged' | 'chainChanged';

type SolanaRequestMethod =
  | 'connect'
  | 'disconnect'
  | 'signAndSendTransaction'
  | 'signTransaction'
  | 'signAllTransactions'
  | 'signMessage';

type EthereumRequestMethod =
  | 'eth_getTransactionReceipt'
  | 'eth_sendTransaction'
  | 'eth_requestAccounts'
  | 'personal_sign'
  | 'eth_accounts'
  | 'eth_chainId'
  | 'wallet_switchEthereumChain';


interface SolanaConnectOptions {
  onlyIfTrusted: boolean;
}

export interface PhantomSolanaProvider {
  publicKey: PublicKey | null;
  isConnected: boolean | null;
  signAndSendTransaction: (
    transaction: Transaction | VersionedTransaction,
    opts?: SendOptions,
  ) => Promise<{ signature: string; publicKey: PublicKey }>;
  signTransaction: (transaction: Transaction | VersionedTransaction) => Promise<Transaction | VersionedTransaction>;
  signAllTransactions: (
    transactions: (Transaction | VersionedTransaction)[],
  ) => Promise<(Transaction | VersionedTransaction)[]>;
  signMessage: (message: Uint8Array | string, display?: DisplayEncoding) => Promise<any>;
  connect: (opts?: Partial<SolanaConnectOptions>) => Promise<{ publicKey: PublicKey }>;
  disconnect: () => Promise<void>;
  on: (event: SolanaEvent, handler: (args: any) => void) => void;
  request: (method: SolanaRequestMethod, params: any) => Promise<unknown>;
}


export interface PhantomEthereumProvider {
  isMetaMask?: boolean; // will be removed after beta
  isPhantom: boolean;
  on: (event: EthereumEvent, handler: (args: any) => void) => void;
  request: (args: { method: EthereumRequestMethod; params?: unknown[] | object }) => Promise<unknown>;
  _metamask: {
    isUnlocked: boolean;
  };
}

export interface PhantomInjectedProvider {
  ethereum: PhantomEthereumProvider;
  solana: PhantomSolanaProvider;
}