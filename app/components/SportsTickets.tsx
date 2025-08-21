'use client'

import { useState } from 'react'
import { useWeb3 } from '../context/Web3Context'
import EventCard from './EventCard'

export default function SportsTickets() {
  const { address } = useWeb3()
  const [purchasing, setPurchasing] = useState(false)

  const events = [
    {
      id: 1,
      name: 'Champions League Final',
      date: 'June 1, 2024',
      venue: 'Wembley Stadium',
      price: '0.2 ETH',
      available: 100,
      imageUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1000&auto=format&fit=crop',
    },
    {
      id: 2,
      name: 'NBA Finals Game 7',
      date: 'June 15, 2024',
      venue: 'Madison Square Garden',
      price: '0.25 ETH',
      available: 50,
      imageUrl: 'https://images.unsplash.com/photo-1546519638-68e109cddcc2?q=80&w=1000&auto=format&fit=crop',
    },
    {
      id: 3,
      name: 'Cricket World Cup Final',
      date: 'July 10, 2024',
      venue: 'Lord\'s Cricket Ground',
      price: '0.15 ETH',
      available: 75,
      imageUrl: 'https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?q=80&w=1000&auto=format&fit=crop',
    },
  ]

  const handlePurchase = async (eventId: number) => {
    if (!address) {
      alert('Please connect your wallet first')
      return
    }
    
    setPurchasing(true)
    try {
      // Here you would integrate with your smart contract
      console.log(`Purchasing ticket for event ${eventId} to address ${address}`)
      // Simulate purchase delay
      await new Promise(resolve => setTimeout(resolve, 2000))
      alert('Ticket purchased successfully!')
    } catch (error) {
      console.error('Error purchasing ticket:', error)
      alert('Error purchasing ticket')
    } finally {
      setPurchasing(false)
    }
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-4 sm:p-6">
      <h2 className="text-3xl font-bold mb-8 text-accent text-center">Sports Tickets</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <EventCard
            key={event.id}
            {...event}
            onPurchase={handlePurchase}
            isPurchasing={purchasing}
          />
        ))}
      </div>
    </div>
  )
} 