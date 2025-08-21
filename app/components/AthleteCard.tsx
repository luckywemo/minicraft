'use client'

import Image from 'next/image'

interface AthleteCardProps {
  id: number
  name: string
  sport: string
  price: string
  imageUrl: string
  onMint: (id: number) => void
  isMinting: boolean
}

export default function AthleteCard({
  id,
  name,
  sport,
  price,
  imageUrl,
  onMint,
  isMinting,
}: AthleteCardProps) {
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
        <p className="text-gray-300 mb-2">{sport}</p>
        <p className="text-accent mb-4">{price}</p>
        <button
          onClick={() => onMint(id)}
          disabled={isMinting}
          className="w-full px-4 py-2 bg-accent text-primary rounded-lg font-medium hover:bg-opacity-90 transition-all disabled:opacity-50"
        >
          {isMinting ? 'Minting...' : 'Mint NFT'}
        </button>
      </div>
    </div>
  )
} 