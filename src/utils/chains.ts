import { mainnet, goerli } from 'wagmi/chains'
import { Chain } from 'wagmi'

export const avalandche: Chain = {
  id: 43114,
  name: 'Avalanche C-Chain',
  network: 'avalanche',
  rpcUrls: {
    public: { http: ['https://rpc.ankr.com/avalanche'] },
    default: { http: ['https://rpc.ankr.com/avalanche'] },
  },
  nativeCurrency: { name: 'Avalanche', symbol: 'AVAX', decimals: 18 },
  blockExplorers: {
    default: {
      name: 'snowtrace',
      url: 'https://snowtrace.io/',
    },
  },
}

export const avalandcheFuji: Chain = {
  id: 43113,
  name: 'Avalanche Fuji',
  network: 'avalanche-fuji',
  rpcUrls: {
    public: { http: ['https://rpc.ankr.com/avalanche_fuji'] },
    default: { http: ['https://rpc.ankr.com/avalanche_fuji'] },
  },
  nativeCurrency: { name: 'Avalanche', symbol: 'AVAX', decimals: 18 },
  blockExplorers: {
    default: {
      name: 'snowtrace',
      url: 'https://testnet.snowtrace.io/',
    },
  },
  testnet: true,
}

export const fantomOpera: Chain = {
  id: 250,
  name: 'Fantom Opera',
  network: 'fantom',
  nativeCurrency: { name: 'Fantom', symbol: 'FTM', decimals: 18 },
  rpcUrls: {
    public: { http: ['https://rpc.ftm.tools'] },
    default: { http: ['https://rpc.ftm.tools'] },
  },
  blockExplorers: {
    default: {
      name: 'FTMScan',
      url: 'https://ftmscan.com',
    },
  },
}

export const fantomTestnet: Chain = {
  id: 4002,
  name: 'Fantom Testnet',
  network: 'fantom-testnet',
  nativeCurrency: { name: 'Fantom', symbol: 'FTM', decimals: 18 },
  rpcUrls: {
    public: { http: ['https://rpc.testnet.fantom.network'] },
    default: { http: ['https://rpc.testnet.fantom.network'] },
  },
  blockExplorers: {
    default: {
      name: 'FTMScan',
      url: 'https://testnet.ftmscan.com',
    },
  },
  testnet: true,
}

const bscExplorer = { name: 'BscScan', url: 'https://bscscan.com' }

export const bsc: Chain = {
  id: 56,
  name: 'BNB Smart Chain',
  network: 'bsc',
  rpcUrls: {
    public: { http: ['https://bsc-dataseed1.binance.org'] },
    default: { http: ['https://bsc-dataseed1.binance.org'] },
  },
  blockExplorers: {
    default: bscExplorer,
    etherscan: bscExplorer,
  },
  nativeCurrency: {
    name: 'Binance Chain Native Token',
    symbol: 'BNB',
    decimals: 18,
  },
  contracts: {
    multicall3: {
      address: '0xcA11bde05977b3631167028862bE2a173976CA11',
      blockCreated: 15921452,
    },
  },
}

export const bscTest: Chain = {
  id: 97,
  name: 'BNB Smart Chain Testnet',
  network: 'bsc-testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Test BNB',
    symbol: 'tBNB',
  },
  rpcUrls: {
    public: { http: ['https://bsctestapi.terminet.io/rpc'] },
    default: { http: ['https://bsctestapi.terminet.io/rpc'] },
  },
  blockExplorers: {
    default: { name: 'BscScan', url: 'https://testnet.bscscan.com' },
  },
  contracts: {
    multicall3: {
      address: '0xcA11bde05977b3631167028862bE2a173976CA11',
      blockCreated: 17422483,
    },
  },
  testnet: true,
}

export const okexchain: Chain = {
  id: 66,
  name: 'OKExChain',
  network: 'okexchain-mainnet',
  nativeCurrency: {
    decimals: 18,
    name: 'OKExChain Token',
    symbol: 'OKT',
  },
  rpcUrls: {
    public: { http: ['https://exchainrpc.okex.org/'] },
    default: { http: ['https://exchainrpc.okex.org/'] },
  },
  blockExplorers: {
    default: { name: 'OKLink', url: 'https://www.oklink.com/okexchain/' },
  },
}

export enum ChainId {
  BSC = 56,
  FANTOM = 250,
  POLYGON = 137,
  OKEXCHAIN = 66,
  BSC_TESTNET = 97,
  FANTOM_TESTNET = 4002,
  POLYGON_TESTNET = 80001
}

export { mainnet, goerli }
