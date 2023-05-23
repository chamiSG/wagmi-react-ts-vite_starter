import { bsc, fantomOpera, bscTest } from './chains'
import { configureChains, createClient } from 'wagmi'
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
// import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { polygon } from 'wagmi/chains'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'
import { publicProvider } from 'wagmi/providers/public'
// import { OkexWalletConnector } from './connectors/OkxWallet'
// import { PhantomWalletConnector } from './connectors/Phantom'
// import { OkexWalletConnector } from './connectors/okxWallet'

const CHAINS = [
  bsc,
  fantomOpera,
  polygon,
  bscTest,
  // okexchain,
]

const getNodeRealUrl = (networkName: string) => {
  let host = null

  switch (networkName) {
    case 'homestead':
      if (process.env.NEXT_PUBLIC_NODE_REAL_API_ETH) {
        host = `eth-mainnet.nodereal.io/v1/${process.env.NEXT_PUBLIC_NODE_REAL_API_ETH}`
      }
      break
    case 'goerli':
      if (process.env.NEXT_PUBLIC_NODE_REAL_API_GOERLI) {
        host = `eth-goerli.nodereal.io/v1/${process.env.NEXT_PUBLIC_NODE_REAL_API_GOERLI}`
      }
      break
    default:
      host = null
  }

  const url = `https://${host}`
  return {
    http: url,
    webSocket: url.replace(/^http/i, 'wss').replace('.nodereal.io/v1', '.nodereal.io/ws/v1'),
  }
}

export const { chains, provider, webSocketProvider } = configureChains(CHAINS, [
  publicProvider(),
  jsonRpcProvider({
    rpc: (chain) => {
      return getNodeRealUrl(chain.network) || { http: chain.rpcUrls.default }
    },
  }),
])

export const coinbaseConnector = new CoinbaseWalletConnector({
  chains,
  options: {
    appName: 'wagmi.sh',
    appLogoUrl: 'https://pancakeswap.com/logo.png',
  },
})

// export const walletConnectConnector = new WalletConnectConnector({
//   chains,
//   options: {
//     projectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID,
//     showQrModal: true,
//   },
// })

export const metaMaskConnector = new MetaMaskConnector({
  chains,
  options: {
    shimDisconnect: true,
  },
})

// export const okxConnector = new OkexWalletConnector({ chains })
// export const phantomConnector = new PhantomWalletConnector()

export const client = createClient({
  autoConnect: false,
  provider,
  connectors: [
    metaMaskConnector,
    // phantomConnector,
    coinbaseConnector,
    // walletConnectConnector,
    // okxConnector
    // ontoConnector,
    // injectedConnector,
  ],
})