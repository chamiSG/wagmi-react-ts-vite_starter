import MetamaskIcon from '../components/WalletConnect/icons/metamask';

interface WalletConfig<T = {}> {
  title: string;
  icon: any;
  connectorId: T;
  priority: number | (() => number);
  href?: string;
  installed?: boolean;
  downloadLink?: {
    desktop?: string;
    mobile?: string;
  };
} 

export enum ConnectorNames {
  MetaMask = 'metaMask',
  Onto = 'onto',
  OKX = 'okx',
  Injected = 'injected',
  WalletConnect = 'walletConnect',
  WalletLink = 'coinbaseWallet',
}

export const wallets: WalletConfig<ConnectorNames>[] = [

  {
    title: 'Metamask',
    icon: MetamaskIcon,
    installed: typeof window !== 'undefined' && Boolean((window as any).ethereum?.isMetaMask),
    connectorId: ConnectorNames.MetaMask,
    priority: 1,
    href: 'https://metamask.app.link/dapp/pancakeswap.finance/',
  },

  // {
  //   title: 'Onto',
  //   icon: OntoIcon,
  //   connectorId: ConnectorNames.Onto,
  //   // @ts-ignore
  //   installed: typeof window !== 'undefined' && typeof window.onto !== 'undefined',
  //   priority: () => {
  //     // @ts-ignore
  //     return typeof window !== 'undefined' && typeof window.onto !== 'undefined' ? 0 : 999
  //   },
  // },
  // {
  //   title: 'OKX',
  //   icon: OKXIcon,
  //   connectorId: ConnectorNames.OKX,
  //   // @ts-ignore
  //   installed: typeof window !== 'undefined' && Boolean(window.okexchain.isOKExWallet),
  //   priority: () => {
  //     // @ts-ignore
  //     return typeof window !== 'undefined' && Boolean(window.okexchain.isOKExWallet) ? 0 : 999
  //   },
  // },
  // {
  //   title: 'WalletConnect',
  //   icon: WalletConnectIcon,
  //   connectorId: ConnectorNames.WalletConnect,
  //   priority: 5,
  // },
]
