/* eslint-disable prefer-destructuring */
/* eslint-disable consistent-return */
/* eslint-disable class-methods-use-this */
import {
  Chain,
  ConnectorNotFoundError,
  ResourceUnavailableError,
  RpcError,
  UserRejectedRequestError,
  SwitchChainNotSupportedError,
  ChainNotConfiguredError,
  ProviderRpcError,
  AddChainError,
  SwitchChainError,
} from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { hexValue } from '@ethersproject/bytes'
import { PublicKey } from '@solana/web3.js';
import { PhantomInjectedProvider } from './types'
import { getEthereumSelectedAddress } from './utils/getEthereumSelectedAddress';

const POLLING_INTERVAL = 1000;
const MAX_POLLS = 5;

type ConnectedAccounts = {
  solana: PublicKey | null;
  ethereum: string | undefined;
};

const mappingNetwork: Record<number, string> = {
  1: 'ethereum',
  137: 'polygon',
}

const _phantomMultiChainListener = async (): Promise<PhantomInjectedProvider | null> => {
  let count = 0;

  return new Promise((resolve) => {
    const interval = setInterval(() => {
      if (count === MAX_POLLS) {
        clearInterval(interval);
        resolve(null);
        window.open('https://phantom.app/', '_blank');
      }

      const provider = window.phantom;
      if (provider?.ethereum?.isPhantom && provider?.solana?.isPhantom) {
        clearInterval(interval);
        resolve(provider);
      }
      count++;
    }, POLLING_INTERVAL);
  })
}

export class PhantomWalletConnector extends InjectedConnector {
  readonly id = 'phantom'

  readonly ready = typeof window !== 'undefined' && typeof window.phantom !== 'undefined'

  provider?: Window['phantom']

  constructor({
    chains: _chains,
  }: {
    chains?: Chain[]
  } = {}) {
    const options = {
      name: 'Phantom',
      shimDisconnect: true,
      shimChainChangedDisconnect: true,
    }
    const chains = _chains?.filter((c) => !!mappingNetwork[c.id])
    super({
      chains,
      options,
    })
  }

  async reConnect({ solana, ethereum }: PhantomInjectedProvider) {

    let solanaPubKey: { publicKey: PublicKey } | undefined;
    try {
      solanaPubKey = await solana.connect({ onlyIfTrusted: true });
    } catch (error) {
      if (this.isUserRejectedRequestError(error)) throw new UserRejectedRequestError(error)
      if ((<RpcError>error).code === -32002) throw new ResourceUnavailableError(error)
      throw error
    }

    if (solanaPubKey) {
      try {
        await ethereum.request({ method: 'eth_requestAccounts' });
      } catch (error) {
        if (this.isUserRejectedRequestError(error)) throw new UserRejectedRequestError(error)
        if ((<RpcError>error).code === -32002) throw new ResourceUnavailableError(error)
        throw error
      }
    }
  }

  async connect(): Promise<{
    account: {
      solana: string,
      ethereum: string,
    };
    chain: {
        id: number;
    };
    provider: PhantomInjectedProvider;
}> {
    // try {
      let wasEthereumConnected: boolean | undefined;
      
      const provider = await this.getProvider()
      if (!provider) throw new ConnectorNotFoundError()
      const { solana, ethereum } = provider;

    // let solanaPubKey: { publicKey: PublicKey } | undefined;

    solana.on('accountsChanged', (publicKey: PublicKey) => {
      console.log('Solana: Connected to account: ', publicKey.toBase58())
    })

    // handle solana `disconnect` event
    solana.on('disconnect', () => {
      console.log('Disconnected')
    });

    // handle solana accountChanged event
    solana.on('accountChanged', (publicKey: PublicKey | null) => {
      // if we're still connected, Phantom will pass the publicKey of the new account
      if (publicKey) {
        console.log('Solana: Switched to account: ', publicKey.toBase58())
      } else {
        /**
         * In this case dApps could...
         *
         * 1. Not do anything
         * 2. Only re-connect to the new account if it is trusted
         * 3. Always attempt to reconnect (NOT RECOMMENDED) MULTI-CHAIN PROVIDER TIP
         */
        console.log('Solana: Attempting to switch accounts')

        // attempt to reconnect silently
        this.reConnect({ solana, ethereum });
      }
    });

    // handle ethereum `accountsChanged` event
    // connecting, account switching, and disconnecting are all handled via this event
    // ethereum.on('accountsChanged', (newAccounts: string[]) => {
    //   // if we're still connected, Phantom will return an array with 1 account
    //   if (newAccounts.length > 0) {
    //     setEthereumSelectedAddress(newAccounts[0]);
    //     console.log(`Switched to account ${newAccounts[0]}`)
    //   } else {
    //     /**
    //      * In this case dApps could...
    //      *
    //      * 1. Not do anything
    //      * 2. Always attempt to reconnect (NOT RECOMMENDED) MULTI-CHAIN PROVIDER TIP
    //      */
    //     console.log(`Could not detect new account`)
    //   }
    // });

    // handle ethereum chainChanged event
    ethereum.on('chainChanged', (chainId: number) => {
      console.log(`Switched to Chain ID` , chainId)
    });


    try {
      wasEthereumConnected = !!(await getEthereumSelectedAddress(ethereum));
      if (!wasEthereumConnected) {
        await ethereum.request({ method: 'eth_requestAccounts' });
      }
    } catch (error) {
      if (this.isUserRejectedRequestError(error)) throw new UserRejectedRequestError(error)
      if ((<RpcError>error).code === -32002) throw new ResourceUnavailableError(error)
      throw error
    }

    try {
      if (!wasEthereumConnected && !solana.isConnected) {
        // If ethereum was not connected then we would have showed the EVM pop up, so we should not show the solana pop up.
        await solana.connect({ onlyIfTrusted: true });
      } else if (wasEthereumConnected && !solana.isConnected) {
        // If ethereum was already connected, then we should show the pop up because the solana provider is not connected.
        await solana.connect();
      }
    } catch (error) {
      if (this.isUserRejectedRequestError(error)) throw new UserRejectedRequestError(error)
      if ((<RpcError>error).code === -32002) throw new ResourceUnavailableError(error)
      throw error
    }

    this.emit('message', { type: 'connecting' })



    // const account = await this.getAccount()
    // console.log('account',account)
    // // Switch to chain if provided
    // let id = await this.getChainId()
    // let unsupported = this.isChainUnsupported(id)
    // if (chainId && id !== chainId) {
    //   const chain = await this.switchChain(chainId)
    //   id = chain.id
    //   unsupported = this.isChainUnsupported(id)
    // }

    console.log('provider', provider)
    const ethereumSelectedAddress = await getEthereumSelectedAddress(ethereum)
    const connectedAccounts: ConnectedAccounts = {
      solana: provider?.solana?.publicKey,
      ethereum: ethereumSelectedAddress,
    }

    const id = await ethereum.request({
      method: 'eth_chainId',
      params: [],
    });
    let unsupported = this.isChainUnsupported(id)

    console.log('id', id)
    console.log('connectedAccounts', connectedAccounts)

    return { account: connectedAccounts, chain: { id, unsupported }, provider }
  }


  async getProvider() {
    if (typeof window !== 'undefined') {
      const phantomMultiChainProvider = await _phantomMultiChainListener()
      this.provider = phantomMultiChainProvider
    }
    return this.provider;
  }

  // async switchChain(chainId: number): Promise<Chain> {
  //   const provider = await this.getProvider()
  //   if (!provider) throw new ConnectorNotFoundError()

  //   const id = hexValue(chainId)
  //   if (mappingNetwork[chainId]) {
  //     try {
  //       console.log(provider)
  //       await provider.request({
  //         method: 'wallet_switchEthereumChain',
  //         params: [{ chainId: id }],
  //       })

  //       return (
  //         this.chains.find((x) => x.id === chainId) ?? {
  //           id: chainId,
  //           name: `Okexchain Network`,
  //           network: 'okexchain',
  //           rpcUrls: {
  //             public: { http: ['https://exchainrpc.okex.org'] },
  //             default: { http: ['https://exchainrpc.okex.org'] },
  //           },
  //           nativeCurrency: {
  //             name: 'OKExChain Token',
  //             symbol: 'OKT',
  //             decimals: 18,
  //           },
  //         }
  //       )
  //     } catch (error: any) {
  //       const chain = this.chains.find((x) => x.id === chainId)
  //       if (!chain) throw new ChainNotConfiguredError(error)
  //       // Indicates chain is not added to provider
  //       if (
  //         (<ProviderRpcError>error).code === 4902 ||
  //         // Unwrapping for MetaMask Mobile
  //         // https://github.com/MetaMask/metamask-mobile/issues/2944#issuecomment-976988719
  //         (<RpcError<{ originalError?: { code: number } }>>error)?.data
  //           ?.originalError?.code === 4902
  //       ) {
  //         try {
  //           await provider.request({
  //             method: 'wallet_addEthereumChain',
  //             params: [
  //               {
  //                 chainId: id,
  //                 chainName: chain.name,
  //                 nativeCurrency: chain.nativeCurrency,
  //                 rpcUrls: [chain.rpcUrls.public ?? chain.rpcUrls.default],
  //                 blockExplorerUrls: this.getBlockExplorerUrls(chain),
  //               },
  //             ],
  //           })
  //           return chain
  //         } catch (addError) {
  //           if (this.isUserRejectedRequestError(addError))
  //             throw new UserRejectedRequestError(error)
  //           throw new AddChainError()
  //         }
  //       }

  //       if (this.isUserRejectedRequestError(error))
  //         throw new UserRejectedRequestError(error)
  //       throw new SwitchChainError(error)
  //     }
  //   }
  //   throw new SwitchChainNotSupportedError({ connector: this })
  // }
}
