import React, { useState } from 'react'

function Calculator() {
  const [formData, setFormData] = useState({
    itemName: '',
    quantity: 30,
    marketPrice: 45000,
    stationFee: 500,
    totalMaterialCost: 28000,
    rrr: 0.152,
    hasPremium: true,
    hasArtifacts: false,
    artifactCost: 0
  })

  const [results, setResults] = useState(null)

  const calculateProfit = () => {
    const { itemName, quantity, marketPrice, stationFee, totalMaterialCost, rrr, hasPremium, hasArtifacts, artifactCost } = formData

    let effectiveMaterialCost
    if (hasArtifacts) {
      // Revised math for items with Artifacts
      effectiveMaterialCost = ((totalMaterialCost - artifactCost) * (1 - rrr)) + artifactCost
    } else {
      // Standard calculation
      effectiveMaterialCost = totalMaterialCost * (1 - rrr)
    }

    const totalCostToCraft = (effectiveMaterialCost + stationFee) * quantity
    const grossRevenue = marketPrice * quantity
    const marketTaxRate = hasPremium ? 0.04 : 0.08
    const netRevenue = grossRevenue * (1 - marketTaxRate)
    const finalProfit = netRevenue - totalCostToCraft
    const profitPerItem = finalProfit / quantity

    setResults({
      effectiveMaterialCost,
      totalCostToCraft,
      grossRevenue,
      marketTaxRate,
      netRevenue,
      finalProfit,
      profitPerItem,
      profitMargin: (finalProfit / totalCostToCraft) * 100
    })
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'number' ? parseFloat(value) || 0 : value
    }))
  }

  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-US').format(Math.round(num))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Form */}
        <div className="bg-albion-darker rounded-xl p-6 border border-albion-accent/20">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center">
            <span className="w-8 h-8 bg-albion-accent rounded-lg flex items-center justify-center mr-3 text-white text-sm">1</span>
            Input Parameters
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-albion-silver text-sm font-medium mb-2">Item Name</label>
              <input
                type="text"
                name="itemName"
                value={formData.itemName}
                onChange={handleInputChange}
                placeholder="e.g., Fiend Cowl"
                className="w-full bg-albion-dark border border-albion-accent/30 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-albion-accent"
              />
            </div>

            <div>
              <label className="block text-albion-silver text-sm font-medium mb-2">Quantity to Craft</label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleInputChange}
                className="w-full bg-albion-dark border border-albion-accent/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-albion-accent"
              />
            </div>

            <div>
              <label className="block text-albion-silver text-sm font-medium mb-2">Market Sale Price (per item)</label>
              <input
                type="number"
                name="marketPrice"
                value={formData.marketPrice}
                onChange={handleInputChange}
                className="w-full bg-albion-dark border border-albion-accent/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-albion-accent"
              />
            </div>

            <div>
              <label className="block text-albion-silver text-sm font-medium mb-2">Crafting Station Fee (per item)</label>
              <input
                type="number"
                name="stationFee"
                value={formData.stationFee}
                onChange={handleInputChange}
                className="w-full bg-albion-dark border border-albion-accent/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-albion-accent"
              />
            </div>

            <div>
              <label className="block text-albion-silver text-sm font-medium mb-2">Total Material Cost</label>
              <input
                type="number"
                name="totalMaterialCost"
                value={formData.totalMaterialCost}
                onChange={handleInputChange}
                className="w-full bg-albion-dark border border-albion-accent/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-albion-accent"
              />
            </div>

            <div>
              <label className="block text-albion-silver text-sm font-medium mb-2">Resource Return Rate (RRR)</label>
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  name="rrr"
                  value={formData.rrr}
                  onChange={handleInputChange}
                  step="0.001"
                  min="0"
                  max="1"
                  className="flex-1 bg-albion-dark border border-albion-accent/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-albion-accent"
                />
                <span className="text-albion-silver">= {(formData.rrr * 100).toFixed(1)}%</span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="hasPremium"
                  checked={formData.hasPremium}
                  onChange={handleInputChange}
                  className="w-5 h-5 rounded border-albion-accent/30 bg-albion-dark text-albion-accent focus:ring-albion-accent"
                />
                <span className="text-albion-silver">Has Premium (4% tax)</span>
              </label>
            </div>

            <div className="flex items-center space-x-4">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="hasArtifacts"
                  checked={formData.hasArtifacts}
                  onChange={handleInputChange}
                  className="w-5 h-5 rounded border-albion-accent/30 bg-albion-dark text-albion-accent focus:ring-albion-accent"
                />
                <span className="text-albion-silver">Contains Artifacts</span>
              </label>
            </div>

            {formData.hasArtifacts && (
              <div>
                <label className="block text-albion-silver text-sm font-medium mb-2">Artifact Cost</label>
                <input
                  type="number"
                  name="artifactCost"
                  value={formData.artifactCost}
                  onChange={handleInputChange}
                  className="w-full bg-albion-dark border border-albion-accent/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-albion-accent"
                />
              </div>
            )}

            <button
              onClick={calculateProfit}
              className="w-full bg-gradient-to-r from-albion-accent to-albion-gold text-white font-bold py-4 rounded-lg hover:opacity-90 transition-opacity"
            >
              Calculate Profit
            </button>
          </div>
        </div>

        {/* Results */}
        <div className="bg-albion-darker rounded-xl p-6 border border-albion-accent/20">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center">
            <span className="w-8 h-8 bg-albion-accent rounded-lg flex items-center justify-center mr-3 text-white text-sm">2</span>
            Results
          </h2>

          {results ? (
            <div className="space-y-4">
              <div className="bg-albion-dark rounded-lg p-4 border border-albion-accent/20">
                <h3 className="text-albion-silver text-sm mb-2">Effective Material Cost (per item)</h3>
                <p className="text-2xl font-bold text-white">{formatNumber(results.effectiveMaterialCost)} silver</p>
              </div>

              <div className="bg-albion-dark rounded-lg p-4 border border-albion-accent/20">
                <h3 className="text-albion-silver text-sm mb-2">Total Cost to Craft</h3>
                <p className="text-2xl font-bold text-white">{formatNumber(results.totalCostToCraft)} silver</p>
              </div>

              <div className="bg-albion-dark rounded-lg p-4 border border-albion-accent/20">
                <h3 className="text-albion-silver text-sm mb-2">Gross Revenue</h3>
                <p className="text-2xl font-bold text-white">{formatNumber(results.grossRevenue)} silver</p>
              </div>

              <div className="bg-albion-dark rounded-lg p-4 border border-albion-accent/20">
                <h3 className="text-albion-silver text-sm mb-2">Market Tax Rate</h3>
                <p className="text-2xl font-bold text-white">{(results.marketTaxRate * 100).toFixed(0)}%</p>
              </div>

              <div className="bg-albion-dark rounded-lg p-4 border border-albion-accent/20">
                <h3 className="text-albion-silver text-sm mb-2">Net Revenue (after tax)</h3>
                <p className="text-2xl font-bold text-white">{formatNumber(results.netRevenue)} silver</p>
              </div>

              <div className={`bg-albion-dark rounded-lg p-4 border-2 ${results.finalProfit >= 0 ? 'border-green-500' : 'border-red-500'}`}>
                <h3 className="text-albion-silver text-sm mb-2">Final Profit</h3>
                <p className={`text-3xl font-bold ${results.finalProfit >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {formatNumber(results.finalProfit)} silver
                </p>
              </div>

              <div className={`bg-albion-dark rounded-lg p-4 border-2 ${results.profitPerItem >= 0 ? 'border-green-500' : 'border-red-500'}`}>
                <h3 className="text-albion-silver text-sm mb-2">Profit Per Item</h3>
                <p className={`text-3xl font-bold ${results.profitPerItem >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {formatNumber(results.profitPerItem)} silver
                </p>
              </div>

              <div className="bg-albion-dark rounded-lg p-4 border border-albion-accent/20">
                <h3 className="text-albion-silver text-sm mb-2">Profit Margin</h3>
                <p className={`text-2xl font-bold ${results.profitMargin >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {results.profitMargin.toFixed(2)}%
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-albion-silver text-lg">Enter your parameters and click "Calculate Profit" to see results</p>
            </div>
          )}
        </div>
      </div>

      {/* Info Section */}
      <div className="mt-8 bg-albion-darker rounded-xl p-6 border border-albion-accent/20">
        <h2 className="text-xl font-bold text-white mb-4">Key Variables Explained</h2>
        <div className="grid md:grid-cols-2 gap-6 text-albion-silver">
          <div>
            <h3 className="text-white font-semibold mb-2">Resource Return Rate (RRR)</h3>
            <p className="text-sm">The percentage of materials returned after crafting. Find this by clicking "Building Info" at any crafting station. Add +50% to base city RRR if using Focus.</p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2">Market Tax</h3>
            <p className="text-sm">With Premium: 4% total (2% listing + 2% sales tax). Without Premium: 8% total (4% listing + 4% sales tax).</p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2">Crafting Station Fee</h3>
            <p className="text-sm">Silver cost per item at the station. Varies between different plots in the same city.</p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2">Artifacts</h3>
            <p className="text-sm">Artifacts (like Fiend Cowl Heart) are not affected by Resource Return Rate. Use the artifact checkbox for precise calculations.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Calculator
