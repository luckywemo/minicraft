'use client'
import { createContext, useContext, useState, useEffect } from 'react'
import { ethers } from 'ethers'
import Web3Modal from 'web3modal'

interface Web3ContextType {
  address: string | null
  connectWallet: () => Promise<void>
  disconnectWallet: () => void
}

const Web3Context = createContext<Web3ContextType>({
  address: null,
  connectWallet: async () => {},
  disconnectWallet: () => {},
})

export function Web3Provider({ children }: { children: React.ReactNode }) {
  const [address, setAddress] = useState<string | null>(null)
  const [web3Modal, setWeb3Modal] = useState<Web3Modal | null>(null)

  useEffect(() => {
    const modal = new Web3Modal({
      network: 'mainnet',
      cacheProvider: true,
      providerOptions: {
        /* Add your provider options here */
      }
    })
    setWeb3Modal(modal)
  }, [])

  const connectWallet = async () => {
    if (!web3Modal) return

    try {
      const instance = await web3Modal.connect()
      const provider = new ethers.BrowserProvider(instance)
      const signer = await provider.getSigner()
      const address = await signer.getAddress()
      setAddress(address)
    } catch (error) {
      console.error('Error connecting wallet:', error)
    }
  }

  const disconnectWallet = () => {
    if (web3Modal) {
      web3Modal.clearCachedProvider()
      setAddress(null)
    }
  }

  return (
    <Web3Context.Provider value={{ address, connectWallet, disconnectWallet }}>
      {children}
    </Web3Context.Provider>
  )
}

export const useWeb3 = () => useContext(Web3Context) 