# Tic Tac Toe Game

A modern implementation of the classic Tic Tac Toe game built with React and TypeScript. This project features a clean, responsive design with smooth animations and an intuitive user interface.

## Features

- 🎮 Classic Tic Tac Toe gameplay
- 🎨 Modern and responsive UI with Tailwind CSS
- 🔄 Turn-based gameplay with X and O markers
- 🏆 Win detection and game status display
- 🔄 Game reset functionality
- 📱 Mobile-friendly design
- 🎯 Type-safe development with TypeScript

## Tech Stack

- **Frontend Framework:** React 18
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Routing:** React Router DOM
- **Build Tool:** Create React App

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone [your-repository-url]
cd tic-tac-toe
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm start
# or
yarn start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to play the game.

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App

## How to Play

1. The game is played on a 3x3 grid
2. Players take turns placing their mark (X or O) in an empty square
3. The first player to get 3 of their marks in a row (horizontally, vertically, or diagonally) wins
4. If all squares are filled and no player has won, the game is a draw
5. Click the reset button to start a new game

## Project Structure

```
tic-tac-toe/
├── src/
│   ├── components/   # React components
│   ├── styles/      # CSS and styling files
│   ├── types/       # TypeScript type definitions
│   └── utils/       # Utility functions
├── public/          # Static assets
└── ...config files
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- React team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- Create React App for the development environment
