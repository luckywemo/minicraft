'use client'
import { createContext, useContext, useState, useEffect } from 'react'
import { useAccount, useReadContract, useWriteContract } from 'wagmi'
import { parseEther } from 'viem'

// Smart contract ABI and address
const FILSTORE_ABI = [
  {
    "inputs": [
      {"internalType": "address", "name": "initialOwner", "type": "address"}
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true, "internalType": "uint256", "name": "productId", "type": "uint256"},
      {"indexed": false, "internalType": "string", "name": "name", "type": "string"},
      {"indexed": false, "internalType": "uint256", "name": "price", "type": "uint256"}
    ],
    "name": "ProductCreated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true, "internalType": "uint256", "name": "productId", "type": "uint256"},
      {"indexed": false, "internalType": "address", "name": "buyer", "type": "address"}
    ],
    "name": "ProductPurchased",
    "type": "event"
  },
  {
    "inputs": [
      {"internalType": "string", "name": "name", "type": "string"},
      {"internalType": "string", "name": "description", "type": "string"},
      {"internalType": "uint256", "name": "price", "type": "uint256"},
      {"internalType": "string", "name": "imageURI", "type": "string"},
      {"internalType": "string", "name": "metadataURI", "type": "string"},
      {"internalType": "bool", "name": "isNFT", "type": "bool"}
    ],
    "name": "createProduct",
    "outputs": [
      {"internalType": "uint256", "name": "", "type": "uint256"}
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "uint256", "name": "productId", "type": "uint256"}
    ],
    "name": "getProduct",
    "outputs": [
      {
        "components": [
          {"internalType": "uint256", "name": "id", "type": "uint256"},
          {"internalType": "string", "name": "name", "type": "string"},
          {"internalType": "string", "name": "description", "type": "string"},
          {"internalType": "uint256", "name": "price", "type": "uint256"},
          {"internalType": "string", "name": "imageURI", "type": "string"},
          {"internalType": "string", "name": "metadataURI", "type": "string"},
          {"internalType": "bool", "name": "isNFT", "type": "bool"},
          {"internalType": "address", "name": "owner", "type": "address"}
        ],
        "internalType": "struct FilStore.Product",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "address", "name": "user", "type": "address"}
    ],
    "name": "getUserProducts",
    "outputs": [
      {"internalType": "uint256[]", "name": "", "type": "uint256[]"}
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "uint256", "name": "productId", "type": "uint256"}
    ],
    "name": "purchaseProduct",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "withdraw",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
] as const

// Contract address (will be set after deployment)
const FILSTORE_ADDRESS = process.env.NEXT_PUBLIC_FILSTORE_ADDRESS as `0x${string}` || '0x0000000000000000000000000000000000000000'

interface Product {
  id: bigint
  name: string
  description: string
  price: bigint
  imageURI: string
  metadataURI: string
  isNFT: boolean
  owner: `0x${string}`
}

interface Web3ContextType {
  address: `0x${string}` | undefined
  isConnected: boolean
  products: Product[]
  userProducts: bigint[]
  isLoading: boolean
  purchaseProduct: (productId: number, price: string) => Promise<void>
  getUserProducts: () => Promise<void>
  createProduct: (productData: {
    name: string
    description: string
    price: string
    imageURI: string
    metadataURI: string
    isNFT: boolean
  }) => Promise<void>
}

const Web3Context = createContext<Web3ContextType>({
  address: undefined,
  isConnected: false,
  products: [],
  userProducts: [],
  isLoading: false,
  purchaseProduct: async () => {},
  getUserProducts: async () => {},
  createProduct: async () => {},
})

export function Web3Provider({ children }: { children: React.ReactNode }) {
  const { address, isConnected } = useAccount()
  const { writeContract } = useWriteContract()
  const [products, setProducts] = useState<Product[]>([])
  const [userProducts, setUserProducts] = useState<bigint[]>([])
  const [isLoading, setIsLoading] = useState(false)

  // Read all products (you might want to implement a getAllProducts function in your contract)
  const { data: allProducts, refetch: refetchProducts } = useReadContract({
    address: FILSTORE_ADDRESS,
    abi: FILSTORE_ABI,
    functionName: 'getProduct',
    args: [BigInt(1)], // This is a placeholder - you'll need to implement a proper way to get all products
  })

  // Read user products
  const { data: userProductsData, refetch: refetchUserProducts } = useReadContract({
    address: FILSTORE_ADDRESS,
    abi: FILSTORE_ABI,
    functionName: 'getUserProducts',
    args: address ? [address] : undefined,
  })

  useEffect(() => {
    if (userProductsData) {
      setUserProducts(userProductsData)
    }
  }, [userProductsData])

  const purchaseProduct = async (productId: number, price: string) => {
    if (!isConnected) {
      throw new Error('Please connect your wallet first')
    }

    try {
      setIsLoading(true)
      await writeContract({
        address: FILSTORE_ADDRESS,
        abi: FILSTORE_ABI,
        functionName: 'purchaseProduct',
        args: [BigInt(productId)],
        value: parseEther(price),
      })
      // Refetch user products after purchase
      await refetchUserProducts()
    } catch (error) {
      console.error('Error purchasing product:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const createProduct = async (productData: {
    name: string
    description: string
    price: string
    imageURI: string
    metadataURI: string
    isNFT: boolean
  }) => {
    if (!isConnected) {
      throw new Error('Please connect your wallet first')
    }

    try {
      setIsLoading(true)
      await writeContract({
        address: FILSTORE_ADDRESS,
        abi: FILSTORE_ABI,
        functionName: 'createProduct',
        args: [
          productData.name,
          productData.description,
          parseEther(productData.price),
          productData.imageURI,
          productData.metadataURI,
          productData.isNFT,
        ],
      })
    } catch (error) {
      console.error('Error creating product:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const getUserProducts = async () => {
    if (!isConnected) return
    await refetchUserProducts()
  }

  return (
    <Web3Context.Provider
      value={{
        address,
        isConnected,
        products,
        userProducts,
        isLoading,
        purchaseProduct,
        getUserProducts,
        createProduct,
      }}
    >
      {children}
    </Web3Context.Provider>
  )
}

export const useWeb3 = () => {
  const context = useContext(Web3Context)
  if (!context) {
    throw new Error('useWeb3 must be used within a Web3Provider')
  }
  return context
} 