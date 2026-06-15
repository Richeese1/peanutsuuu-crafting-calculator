import React from 'react'

function Header() {
  return (
    <header className="bg-albion-darker border-b border-albion-accent/30">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-albion-gold to-albion-accent rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">P</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Peanutsuuu's Crafting Calculator</h1>
              <p className="text-albion-silver text-sm">Calculate your crafting profits with precision</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
