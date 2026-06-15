import React, { useState } from 'react'
import Calculator from './components/Calculator'
import Header from './components/Header'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-albion-darker to-albion-dark">
      <Header />
      <Calculator />
    </div>
  )
}

export default App
