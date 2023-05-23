import { forwardRef, ComponentProps, useEffect } from "react";
import { useAccount, useConnect } from 'wagmi';
import MetamaskIcon from "./icons/metamask";
import CoinbaseWalletIcon from "./icons/coinbasewallet";
import useAuth from "../../hooks/useAuth";
import OkxWalletIcon from "./icons/okxwallet";
import PhantomWalletIcon from "./icons/phantom";
import useModal from "../../hooks/useModal";
import Modal from "../Modal/modal";

interface WalletConnectProps extends Omit<ComponentProps<"div">, "className"> {
  isOpen?: boolean;
  onHandle?: () => void;
  onClose: () => void;
}

const WalletConnect = forwardRef<
  HTMLDivElement,
  WalletConnectProps
>(({ isOpen, onHandle, onClose, children, ...rest }, ref) => {

  const { connectors } = useConnect();
  const { login, isLoading } = useAuth();
  const { isOpen: isLoadingModal, onOpen: onOpenLoadingModal, onClose: onCloseLoadingModal } = useModal()

  const connectWallet = async (connectorId: any) => {
    await login(connectorId);
    onClose();
    if (isLoading) {
      onOpenLoadingModal()
    }
  };

  return (
    <>
      {/* <!-- Main modal --> */}
      <div ref={ref} tabIndex={-1} aria-hidden="true" className={`${isOpen ? 'flex' : 'hidden'} fixed top-0 left-0 right-0 z-50 w-full transition-all p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full justify-center items-center`} {...rest}>
        <div className="relative w-full max-w-md max-h-full">
          {/* <!-- Modal content --> */}
          <div className={`relative bg-white rounded-lg shadow dark:bg-gray-700`}>
            <button type="button" onClick={onClose} className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-hide="crypto-modal">
              <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
              <span className="sr-only">Close modal</span>
            </button>
            {/* <!-- Modal header --> */}
            <div className="px-6 py-4 border-b rounded-t dark:border-gray-600 text-left">
              <h3 className="text-base font-semibold text-gray-900 lg:text-xl dark:text-white">
                Connect Wallet
              </h3>
            </div>
            {/* <!-- Modal body --> */}
            <div className="p-6">
              <p className="text-left text-sm font-normal text-gray-500 dark:text-gray-400">Connect with one of our available wallet providers or create a new one.</p>
              <ul className="my-4 space-y-3">
                {connectors.map((connector) => (
                  <li key={connector.id} >
                    <button onClick={() => connectWallet(connector.id)} disabled={!connector.ready} className={`${!connector.ready ? 'opacity-30' : ''} flex w-full items-center p-3 text-base font-bold text-gray-800 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow-sm dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white`}>
                      {connector.name === "MetaMask" &&
                        <MetamaskIcon />
                      }
                      {connector.name === "Coinbase Wallet" &&
                        <CoinbaseWalletIcon />
                      }

                      {connector.name === "Okx" &&
                        <OkxWalletIcon />
                      }

                      {connector.name === "Phantom" &&
                        <PhantomWalletIcon />
                      }
                      <span className="flex-1 ml-3 text-left whitespace-nowrap capitalize">{connector.name}</span>
                      {connector.ready && connector.name === "MetaMask" &&
                        <span className="inline-flex items-center justify-center px-2 py-0.5 ml-3 text-xs font-medium text-gray-500 bg-gray-200 rounded dark:bg-gray-700 dark:text-gray-400">Popular</span>
                      }
                      {!connector.ready &&
                        <span className="inline-flex items-center justify-center px-2 py-0.5 ml-3 text-xs font-medium text-gray-500 bg-gray-200 rounded dark:bg-gray-700 dark:text-gray-400">Not installed</span>
                      }
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className={`bg-gray-900 bg-opacity-50 dark:bg-opacity-90 fixed inset-0 z-40 transition-all ${isOpen ? '' : 'hidden'}`}></div>

      <Modal isOpen={isLoadingModal} onClose={onCloseLoadingModal} isHeader={false} isFooter={false}>
        <div className="p-6 flex flex-col items-center">
          <div className="flex items-center justify-center relative ">
            <MetamaskIcon className="h-14 relative" />
            <div className="absolute w-24 h-24 border-l-2 border-brand-500 rounded-full animate-spin">
            </div>
            {/* {connector.name === "MetaMask" && */}

            {/* } */}
            {/* {connector.name === "Coinbase Wallet" &&
                <CoinbaseWalletIcon />
              } */}
          </div>
          <div className="mt-10 space-y-3">
            <p className="text-lg font-normal text-gray-900 dark:text-white">Connecting to your wallet</p>
            <p className="text-sm font-normal text-gray-500 dark:text-gray-400">Click connect in your wallet popup</p>
          </div>
        </div>
      </Modal>
    </>
  );
});

export default WalletConnect;
