// import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Button from './components/Button'
import useModal from './hooks/useModal'
import WalletConnect from './components/WalletConnect'
import { useAccount, useNetwork } from 'wagmi'
import useAuth from './hooks/useAuth'

function App() {
  const { isOpen, onOpen, onClose } = useModal()
  const { address, connector, isConnected } = useAccount()
  const { chain } = useNetwork()
  const { logout } = useAuth();

  if (isConnected) {
    return (
      <>
        <div className='flex flex-col items-center'>
          <div className='flex'>
            <a href="https://vitejs.dev" target="_blank">
              <img src={viteLogo} className="logo" alt="Vite logo" />
            </a>
            <a href="https://react.dev" target="_blank">
              <img src={reactLogo} className="logo react" alt="React logo" />
            </a>
          </div>
          <h1 className='mb-4'>Vite + React + TypeScript + Wagmi</h1>

          <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Wallet Info</h5>
            </div>
            <div className="flow-root">
              <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                <li className="py-3 sm:py-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                        {address}
                      </p>
                      <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                        Connected to {connector?.name} on {chain?.name}
                      </p>
                    </div>

                  </div>
                </li>
                <li className="py-3 sm:py-4">
                  <Button colorType='secondary' onClick={logout}>Disconnect</Button>
                </li>
              </ul>
            </div>
          </div>

        </div>
        <WalletConnect isOpen={isOpen} onClose={onClose} />
      </>
    )
  }

  return (
    <>
      <div className='flex flex-col items-center'>
        <div className='flex'>
          <a href="https://vitejs.dev" target="_blank">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        <h1>Vite + React + TypeScript + Wagmi</h1>
        <div className="card">
          <Button colorType='primary' onClick={onOpen}>Connect Wallet</Button>
        </div>
      </div>
      <WalletConnect isOpen={isOpen} onClose={onClose} />
    </>
  )
}

export default App
