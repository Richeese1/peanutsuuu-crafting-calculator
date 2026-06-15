# Albion Crafting Calculator

A modern React-based calculator for Albion Online crafting profits, built with ReactJS, Firebase, and Tailwind CSS.

## Features

- **Accurate Profit Calculations**: Uses the official Albion Online crafting formulas
- **Resource Return Rate (RRR)**: Accounts for material returns with optional Focus bonus
- **Market Tax Handling**: Automatic calculation for Premium (4%) and non-Premium (8%) players
- **Artifact Support**: Precise calculations for items containing artifacts
- **Modern UI**: Beautiful dark theme with Albion-inspired colors
- **Firebase Integration**: Ready for authentication and data persistence

## Installation

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Setup Steps

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Configure Firebase**:
   - Create a Firebase project at https://console.firebase.google.com/
   - Enable Authentication (Email/Password) and Firestore Database
   - Copy your Firebase config
   - Replace the placeholder values in `src/firebase/config.js` with your actual Firebase credentials

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

## Usage

### Basic Calculation

1. Enter the item name (e.g., "Fiend Cowl")
2. Set the quantity to craft
3. Input the market sale price per item
4. Add the crafting station fee per item
5. Enter the total material cost
6. Set your Resource Return Rate (RRR) as a decimal (e.g., 0.152 for 15.2%)
7. Check if you have Premium (affects market tax)
8. Click "Calculate Profit"

### Advanced Features

**Artifact Handling**: If your item contains artifacts (like Fiend Cowl Heart):
- Check the "Contains Artifacts" box
- Enter the artifact cost separately
- The calculator will apply the correct formula: `((Materials - Artifacts) * (1 - RRR)) + Artifacts + Station Fee`

**Focus Bonus**: If using Focus, add 50% to your base city RRR before entering it.

## Formulas Used

### Standard Calculation
```
Effective Material Cost = Total Material Cost * (1 - Resource Return Rate)
Total Cost to Craft = (Effective Material Cost + Crafting Station Fee) * Quantity
Gross Revenue = Market Sale Price * Quantity
Market Tax Rate = 0.04 if Premium, else 0.08
Net Revenue = Gross Revenue * (1 - Market Tax Rate)
Final Profit = Net Revenue - Total Cost to Craft
```

### With Artifacts
```
Effective Cost = ((Materials - Artifacts) * (1 - RRR)) + Artifacts + Station Fee
```

## Key Variables Explained

- **Resource Return Rate (RRR)**: Percentage of materials returned after crafting. Find this by clicking "Building Info" at any crafting station. Add +50% to base city RRR if using Focus.

- **Market Tax**: 
  - With Premium: 4% total (2% listing fee + 2% sales tax)
  - Without Premium: 8% total (4% listing fee + 4% sales tax)

- **Crafting Station Fee**: Silver cost per item at the station. Varies between different plots in the same city.

- **Artifacts**: Items like Fiend Cowl Heart are not affected by Resource Return Rate and should be calculated separately.

## Tech Stack

- **ReactJS**: UI framework
- **Vite**: Build tool and dev server
- **Tailwind CSS**: Styling
- **Firebase**: Authentication and database
- **PostCSS + Autoprefixer**: CSS processing

## Project Structure

```
peanutsuuu-crafting-calculator/
├── src/
│   ├── components/
│   │   ├── Calculator.jsx    # Main calculator component
│   │   └── Header.jsx        # Application header
│   ├── firebase/
│   │   └── config.js         # Firebase configuration
│   ├── App.jsx               # Main app component
│   ├── main.jsx              # React entry point
│   └── index.css             # Global styles with Tailwind
├── public/                   # Static assets
├── index.html                # HTML template
├── package.json              # Dependencies
├── tailwind.config.js        # Tailwind configuration
├── vite.config.js            # Vite configuration
└── README.md                 # This file
```

## Customization

### Colors
The app uses custom Albion-inspired colors defined in `tailwind.config.js`:
- `albion-gold`: #FFD700
- `albion-silver`: #C0C0C0
- `albion-dark`: #1a1a2e
- `albion-darker`: #16213e
- `albion-accent`: #e94560

### Firebase Features
The Firebase configuration is set up but not actively used in the current version. You can extend the app to include:
- User authentication
- Save/load calculation presets
- Share calculations with other players
- Track crafting history

## License

This project is open source and available for personal use.

## Contributing

Feel free to submit issues and enhancement requests!
