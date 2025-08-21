'use client'

import { useState } from 'react'
import { ChartBarIcon, TrophyIcon, UserGroupIcon } from '@heroicons/react/24/outline'
import { useWeb3 } from './context/Web3Context'
import AthleteNFT from './components/AthleteNFT'
import SportsTickets from './components/SportsTickets'
import Image from 'next/image'

export default function Home() {
  const { address, connectWallet, disconnectWallet } = useWeb3()
  const [activeSection, setActiveSection] = useState('home')

  const features = [
    {
      name: 'Real-time Analysis',
      description: 'Get instant insights and predictions for your favorite sports',
      icon: ChartBarIcon,
    },
    {
      name: 'Competitive Leaderboards',
      description: 'Compete with other analysts and earn rewards',
      icon: TrophyIcon,
    },
    {
      name: 'Community Driven',
      description: 'Join a community of sports enthusiasts and analysts',
      icon: UserGroupIcon,
    },
  ]

  return (
    <main className="min-h-screen">
      {/* Navigation */}
      <nav className="bg-secondary p-4 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between">
          <h1 className="text-2xl font-bold text-accent mb-4 sm:mb-0">Khela</h1>
          <div className="flex flex-wrap items-center gap-2 sm:gap-4">
            <button
              onClick={() => setActiveSection('home')}
              className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-sm sm:text-base ${
                activeSection === 'home' ? 'bg-accent text-primary' : 'text-gray-300 hover:text-white'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => setActiveSection('nfts')}
              className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-sm sm:text-base ${
                activeSection === 'nfts' ? 'bg-accent text-primary' : 'text-gray-300 hover:text-white'
              }`}
            >
              Athlete NFTs
            </button>
            <button
              onClick={() => setActiveSection('tickets')}
              className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-sm sm:text-base ${
                activeSection === 'tickets' ? 'bg-accent text-primary' : 'text-gray-300 hover:text-white'
              }`}
            >
              Sports Tickets
            </button>
            <button
              onClick={address ? disconnectWallet : connectWallet}
              className="px-3 py-1.5 sm:px-4 sm:py-2 bg-accent text-primary rounded-lg font-medium hover:bg-opacity-90 transition-all text-sm sm:text-base"
            >
              {address ? 'Disconnect' : 'Connect'}
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeSection === 'home' && (
          <div className="space-y-12">
            {/* Hero Section */}
            <div className="relative h-[300px] sm:h-[400px] lg:h-[500px] rounded-lg overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1000&auto=format&fit=crop"
                alt="Sports Hero"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="text-center text-white p-4">
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 text-accent">
                    Welcome to Khela
                  </h1>
                  <p className="text-lg sm:text-xl text-gray-200 max-w-2xl mx-auto">
                    Your gateway to Web3-powered sports analysis, NFT collectibles, and event tickets
                  </p>
                </div>
              </div>
            </div>
            
            {/* Features Section */}
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => (
                <div
                  key={feature.name}
                  className="relative flex flex-col gap-6 rounded-lg p-6 bg-secondary hover:bg-opacity-80 transition-all"
                >
                  <feature.icon className="h-12 w-12 text-accent" aria-hidden="true" />
                  <div>
                    <h3 className="text-lg font-medium">{feature.name}</h3>
                    <p className="mt-2 text-gray-300">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'nfts' && <AthleteNFT />}
        {activeSection === 'tickets' && <SportsTickets />}
      </div>
    </main>
  )
} 