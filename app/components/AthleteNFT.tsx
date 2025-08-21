'use client'

import { useState } from 'react'
import { useWeb3 } from '../context/Web3Context'
import AthleteCard from './AthleteCard'

export default function AthleteNFT() {
  const { address } = useWeb3()
  const [minting, setMinting] = useState(false)

  const athletes = [
    {
      id: 1,
      name: 'Lionel Messi',
      sport: 'Football',
      price: '0.1 ETH',
      imageUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1000&auto=format&fit=crop',
    },
    {
      id: 2,
      name: 'LeBron James',
      sport: 'Basketball',
      price: '0.15 ETH',
      imageUrl: 'https://images.unsplash.com/photo-1546519638-68e109cddcc2?q=80&w=1000&auto=format&fit=crop',
    },
    {
      id: 3,
      name: 'Virat Kohli',
      sport: 'Cricket',
      price: '0.08 ETH',
      imageUrl: 'https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?q=80&w=1000&auto=format&fit=crop',
    },
  ]

  const handleMint = async (athleteId: number) => {
    if (!address) {
      alert('Please connect your wallet first')
      return
    }
    
    setMinting(true)
    try {
      // Here you would integrate with your smart contract
      console.log(`Minting NFT for athlete ${athleteId} to address ${address}`)
      // Simulate minting delay
      await new Promise(resolve => setTimeout(resolve, 2000))
      alert('NFT minted successfully!')
    } catch (error) {
      console.error('Error minting NFT:', error)
      alert('Error minting NFT')
    } finally {
      setMinting(false)
    }
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-4 sm:p-6">
      <h2 className="text-3xl font-bold mb-8 text-accent text-center">Mint Athlete NFTs</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {athletes.map((athlete) => (
          <AthleteCard
            key={athlete.id}
            {...athlete}
            onMint={handleMint}
            isMinting={minting}
          />
        ))}
      </div>
    </div>
  )
} 