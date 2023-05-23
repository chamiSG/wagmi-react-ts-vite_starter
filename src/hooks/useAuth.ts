import { useCallback, useState } from "react"
import { ConnectorNotFoundError, UserRejectedRequestError, useConnect, useDisconnect } from "wagmi"
import { ConnectorNames } from "../config/wallet"
import { ChainId } from "../utils/chains"

type ConnectorLocalStorageKeyType = {
  isActiveConnector: boolean;
  connectorId: string | undefined;
  chainId: number;
}

const connectorLocalStorageKey: ConnectorLocalStorageKeyType = {
  isActiveConnector: false,
  connectorId: '',
  chainId: 0
}

const useAuth = () => {
  const [ isLoading, setIsLoading ] = useState(false);
  const { connectAsync, connectors } = useConnect()
  const { disconnectAsync } = useDisconnect()

  const login = useCallback(
    async (connectorId: ConnectorNames) => {
      setIsLoading(true)
      const findConnector = connectors.find((c) => c.id === connectorId);
      try {
        const connected = await connectAsync({ connector: findConnector })
        
        if (!connected.chain.unsupported) {
          connectorLocalStorageKey.isActiveConnector = true;
          connectorLocalStorageKey.connectorId = connected.connector?.id;
          connectorLocalStorageKey.chainId = connected.chain.id;
          window?.localStorage?.setItem('wallet-info', JSON.stringify(connectorLocalStorageKey))
        }
        setIsLoading(false)
        return connected
      } catch (error) {
        if (error instanceof ConnectorNotFoundError) {
          // toast({
          //   title: 'Provider Error',
          //   description: error.message,
          //   status: 'error',
          //   ...TOAST_OPTOPNS
          // });
          return
        }
        if (error instanceof UserRejectedRequestError) {
          // toast({
          //   title: 'UserRejected Error',
          //   description: error.message,
          //   status: 'error',
          //   ...TOAST_OPTOPNS
          // });
          return
        }
        if (error instanceof Error) {
          // toast({
          //   title: 'Please authorize to access your account',
          //   description: error.message,
          //   status: 'error',
          //   ...TOAST_OPTOPNS
          // });
        }
        setIsLoading(false)
      }

  }, [connectors, connectAsync])

  const logout = useCallback(async () => {
    try {
      window?.localStorage?.removeItem('wallet-info')
      await disconnectAsync()
    } catch (error) {
      console.error(error)
    } finally {
      console.log('Disconnected')
    }
  }, [disconnectAsync])

  return { login, logout, isLoading }
}

export default useAuth