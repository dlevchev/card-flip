# Memory Matching Game

A responsive, accessible memory matching game built with Vue 3, TypeScript, and Pinia. Players select a grid size, flip cards to find matching pairs, track their attempts, and enjoy sound effects with light/dark mode support.

## Features

### Core Requirements
- ✅ **Vue 3 Implementation** - Built with Composition API and TypeScript
- ✅ **Grid Size Selection** - Choose between 4×4 and 6×6 grids before starting
- ✅ **Randomized Card Order** - Cards are shuffled on each new game using Fisher-Yates algorithm
- ✅ **Gameplay Mechanics** - Flip cards to find matching pairs; unmatched cards flip back after 1 second
- ✅ **Attempt Tracking** - Counts attempts (each pair reveal = 1 attempt)
- ✅ **Timer** - Real-time game duration tracking in MM:SS format
- ✅ **Reset/Restart Button** - Return to grid selection or restart current game
- ✅ **Completion Message** - Displays "You completed the game in X attempts and MM:SS"
- ✅ **Accessibility** - Keyboard navigation, semantic HTML, ARIA labels, screen reader support

### Optional Enhancements
- ✅ **Best Score Tracking** - Saves best score to localStorage and displays on start screen
- ✅ **New Record Detection** - Displays badge when beating previous best score
- ✅ **Sound Effects** - Audio feedback for matches, mismatches, and new records
  - `match.mp3` - When cards match
  - `no-match.mp3` - When cards don't match
  - `win.mp3` - Game completion and new records
- ✅ **Sound Toggle Button** - Mute/unmute button in bottom right corner
- ✅ **Light/Dark Mode** - Theme toggle button in header (top right)
- ✅ **Card Flip Animations** - Smooth 3D flip transitions
- ✅ **Responsive Design** - Works on desktop, tablet, and mobile
- ✅ **Visual Feedback** - Matched cards change color, completion modal appears
- ✅ **Reduced Motion Support** - Respects `prefers-reduced-motion` setting
- ✅ **Component Architecture** - Separated Card component for better maintainability

## Project Structure

```
card-flip/
├── index.html                         # Entry HTML file
├── package.json                       # Project dependencies
├── vite.config.ts                     # Vite configuration
├── tsconfig.json                      # TypeScript configuration
├── README.md                          # This file
├── public/
│   └── assets/
│       ├── sounds/                    # Audio files
│       │   ├── match.mp3
│       │   ├── no-match.mp3
│       │   └── win.mp3
│       └── styles/
│           └── main.css               # Centralized styles
├── src/
│   ├── main.ts                        # Vue app initialization with Pinia
│   ├── style.css                      # Global styles import
│   ├── App.vue                        # Root component with theme toggle
│   ├── stores/
│   │   └── gameStore.ts               # Pinia store for game state
│   ├── utils/
│   │   └── soundEffects.ts            # Sound effects utility
│   └── components/
│       ├── GridSizeSelector.vue       # Grid size selection screen
│       ├── GameBoard.vue              # Main game board component
│       └── Card.vue                   # Individual card component
```

## Setup Instructions

### Prerequisites
- Node.js 16+ and npm (or yarn/pnpm)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd card-flip
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Add audio files**
   - Place your audio files in `public/assets/sounds/`:
     - `match.mp3`
     - `no-match.mp3`
     - `win.mp3`

## How to Run Locally

### Development Server
Start the Vite development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Production Build
Create an optimized production build:
```bash
npm run build
```

The output will be in the `dist/` directory.

### Preview Production Build
Preview the production build locally:
```bash
npm run preview
```

### Format Code
Format all code with Prettier:
```bash
npm run format
```

## Gameplay Instructions

1. **Select Grid Size** - Choose between 4×4 (16 cards) or 6×6 (36 cards)
2. **Flip Cards** - Click or use keyboard (Enter/Space) to flip cards
3. **Match Pairs** - Find two cards with the same emoji
4. **Complete Game** - Match all pairs and see your final attempt count and time
5. **Play Again** - Return to grid selection or restart the current game
6. **Toggle Sound** - Click the speaker button (🔊) in bottom right to mute/unmute
7. **Toggle Theme** - Click the moon/sun button (🌙/☀️) in header to switch themes

## Keyboard Navigation

- **Tab** - Navigate between cards and buttons
- **Enter/Space** - Flip the focused card
- **Focus Indicators** - All interactive elements have visible focus outlines
- **Screen Readers** - Cards and buttons have descriptive ARIA labels

## Accessibility Features

- **Semantic HTML** - Proper heading hierarchy, button elements, and landmarks
- **ARIA Labels** - Cards and buttons have descriptive aria-labels for screen readers
- **Keyboard Navigation** - Full keyboard accessibility (Tab, Enter, Space)
- **Focus Management** - Clear visual focus indicators on all interactive elements
- **Reduced Motion** - Respects `prefers-reduced-motion` CSS media query
- **Color Contrast** - High contrast ratios for text and interactive elements
- **Modal Dialog** - Completion modal has proper ARIA attributes
- **Dark Mode** - Alternative color scheme for reduced eye strain

## Game Logic

### State Management (Pinia Store)
- `bestScores` - Map of grid sizes to best game scores
- `gameTimer` - Current game elapsed time in seconds
- `timerInterval` - Reference to the timer interval

**Store Methods:**
- `loadScores()` - Load saved scores from localStorage
- `saveScores()` - Save scores to localStorage
- `updateScore()` - Update best score and return if new record
- `getBestScore()` - Get best score for a grid size
- `startTimer()` - Start the game timer
- `stopTimer()` - Stop the game timer
- `resetTimer()` - Reset timer to 0
- `formatTime()` - Format seconds to MM:SS format

### Component State (GameBoard)
- `cards` - Array of card objects with emoji, flipped, and matched status
- `attempts` - Number of pair reveals
- `flippedIndices` - Indices of currently flipped cards
- `matchedIndices` - Set of indices for matched cards
- `isProcessing` - Prevents card flips during comparison delay
- `gameComplete` - Boolean indicating game completion
- `isNewRecord` - Boolean indicating if current score is best
- `isMuted` - Boolean indicating sound mute status

### Key Algorithms
- **Fisher-Yates Shuffle** - Randomizes card order with uniform distribution
- **Card Matching** - Compares two flipped cards; resets after 1 second if no match
- **Game Completion** - Tracks when all pairs are matched
- **Best Score Logic** - Compares attempts first, then time if attempts are equal

## Sound Effects

Sound effects are managed through the `soundEffects` utility:

```typescript
soundEffects.play('match')      // When cards match
soundEffects.play('mismatch')   // When cards don't match
soundEffects.play('complete')   // Game completion
soundEffects.play('newRecord')  // New record achieved
soundEffects.toggleMute()       // Toggle mute state
soundEffects.setMuted(bool)     // Set mute state
soundEffects.isMutedValue()     // Get current mute state
```

## Theme System

Light/Dark mode is managed in `App.vue`:

- **Light Mode (Default)** - Bright gradient background with high contrast colors
- **Dark Mode** - Dark gradient background with adjusted component colors
- **Persistence** - Theme preference saved to localStorage as `cardFlipDarkMode`
- **Auto-Detection** - Uses saved preference on app load

**Dark Mode Colors:**
- Background: `#1a1a2e` to `#16213e` gradient
- Card Front: `#4a4a7a` to `#5a3a7a` gradient
- Card Back: `#3a3a3a` background
- Text: `#f0f0f0` for light text on dark backgrounds

## Component Architecture

### App.vue
Root component handling:
- Theme toggle and persistence
- Game state (started/not started)
- Grid size selection
- Component routing between GridSizeSelector and GameBoard

### GridSizeSelector.vue
Grid size selection screen featuring:
- Two size options (4×4 and 6×6)
- Best scores display for each grid size
- Responsive button layout

### GameBoard.vue
Main game board component with:
- Game stats display (time, attempts, matched pairs)
- Reset button
- Card grid rendering using Card component
- Sound toggle button
- Completion modal
- Game logic and timer management

### Card.vue
Individual card component featuring:
- Card flip animation (3D transform)
- Matched state styling
- Keyboard and mouse event handling
- ARIA labels for accessibility
- Dark mode support

### Stores/gameStore.ts
Pinia store managing:
- Best score persistence
- Game timer management
- Score comparison and new record detection
- localStorage integration

### Utils/soundEffects.ts
Audio utility managing:
- Sound file loading
- Mute/unmute functionality
- Audio playback with error handling

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Data Persistence

### localStorage Keys
- `memoryGameScores` - Best scores for each grid size (JSON format)
- `cardFlipDarkMode` - Theme preference (boolean)

## Performance Considerations

- Cards use CSS transforms for animations (GPU-accelerated)
- Event listeners are properly cleaned up on component unmount
- No unnecessary re-renders due to Vue 3's reactivity system
- Timer interval is cleared when component unmounts
- Audio files are preloaded for instant playback

## Technologies Used

- **Vue 3** - Progressive JavaScript framework
- **TypeScript** - Type-safe JavaScript
- **Pinia** - State management
- **Vite** - Build tool and dev server
- **CSS Grid** - Responsive card layout
- **CSS Transforms** - Card flip animations
- **Web Audio API** - Sound effects
- **localStorage** - Data persistence

## Future Enhancements

- Multiplayer support with score comparison
- Different card themes (animals, numbers, flags, etc.)
- Difficulty levels with time limits
- Game statistics and history tracking
- PWA support for offline play
- Leaderboard system
- Custom emoji selection
- Game replay feature

## Testing

The game has been tested for:
- ✅ Game mechanics (matching, flipping, completion)
- ✅ Keyboard navigation and accessibility
- ✅ Responsive design on mobile and desktop
- ✅ localStorage functionality
- ✅ Sound playback across browsers
- ✅ Theme switching and persistence
- ✅ Browser compatibility
- ✅ ARIA labels and screen reader support

## License

This project is provided as-is for evaluation purposes.

## Questions?

For questions about the code or project structure, please review the component files in `src/components/` and the store in `src/stores/gameStore.ts`.
