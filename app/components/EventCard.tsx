'use client'

import Image from 'next/image'

interface EventCardProps {
  id: number
  name: string
  date: string
  venue: string
  price: string
  available: number
  imageUrl: string
  onPurchase: (id: number) => void
  isPurchasing: boolean
}

export default function EventCard({
  id,
  name,
  date,
  venue,
  price,
  available,
  imageUrl,
  onPurchase,
  isPurchasing,
}: EventCardProps) {
  return (
    <div className="bg-secondary rounded-lg overflow-hidden hover:bg-opacity-80 transition-all">
      <div className="relative h-48 w-full">
        <Image
          src={imageUrl}
          alt={name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{name}</h3>
        <p className="text-gray-300 mb-1">{date}</p>
        <p className="text-gray-300 mb-1">{venue}</p>
        <p className="text-accent mb-2">{price}</p>
        <p className="text-gray-300 mb-4">Available: {available}</p>
        <button
          onClick={() => onPurchase(id)}
          disabled={isPurchasing}
          className="w-full px-4 py-2 bg-accent text-primary rounded-lg font-medium hover:bg-opacity-90 transition-all disabled:opacity-50"
        >
          {isPurchasing ? 'Processing...' : 'Purchase Ticket'}
        </button>
      </div>
    </div>
  )
} 