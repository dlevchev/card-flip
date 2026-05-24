# Memory Matching Game

A responsive, accessible memory matching game built with Vue 3. Players select a grid size, flip cards to find matching pairs, and track their attempts.

## Features

### Core Requirements
- ✅ **Vue 3 Implementation** - Built with Composition API
- ✅ **Grid Size Selection** - Choose between 4×4 and 6×6 grids before starting
- ✅ **Randomized Card Order** - Cards are shuffled on each new game using Fisher-Yates algorithm
- ✅ **Gameplay Mechanics** - Flip cards to find matching pairs; unmatched cards flip back after 1 second
- ✅ **Attempt Tracking** - Counts attempts (each pair reveal = 1 attempt)
- ✅ **Reset/Restart Button** - Return to grid selection or restart current game
- ✅ **Completion Message** - Displays "You completed the game in X attempts"
- ✅ **Accessibility** - Keyboard navigation, semantic HTML, ARIA labels, screen reader support

### Optional Enhancements
- ✅ **Best Score Tracking** - Saves best score to localStorage and displays on start screen
- ✅ **Card Flip Animations** - Smooth 3D flip transitions
- ✅ **Responsive Design** - Works on desktop, tablet, and mobile
- ✅ **Visual Feedback** - Matched cards change color, completion modal appears
- ✅ **Reduced Motion Support** - Respects `prefers-reduced-motion` setting

## Project Structure

```
card-flip/
├── index.html                    # Entry HTML file
├── package.json                  # Project dependencies
├── vite.config.js               # Vite configuration
├── README.md                     # This file
├── src/
│   ├── main.js                  # Vue app initialization
│   ├── App.vue                  # Root component (layout & state management)
│   ├── style.css                # Global styles & accessibility
│   └── components/
│       ├── GridSizeSelector.vue # Grid size selection screen
│       └── GameBoard.vue        # Main game board component
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

## How to Run Locally

### Development Server
Start the Vite development server:
```bash
npm run dev
```

The app will be available at `http://localhost:3000`

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

## Gameplay Instructions

1. **Select Grid Size** - Choose between 4×4 (16 cards) or 6×6 (36 cards)
2. **Flip Cards** - Click or use keyboard (Enter/Space) to flip cards
3. **Match Pairs** - Find two cards with the same emoji
4. **Complete Game** - Match all pairs and see your final attempt count
5. **Play Again** - Return to grid selection or restart the current game

## Keyboard Navigation

- **Tab** - Navigate between cards
- **Enter/Space** - Flip the focused card
- **Focus Indicators** - All interactive elements have visible focus outlines
- **Screen Readers** - Cards have descriptive ARIA labels

## Accessibility Features

- **Semantic HTML** - Proper heading hierarchy, button elements, and landmarks
- **ARIA Labels** - Cards and buttons have descriptive aria-labels for screen readers
- **Keyboard Navigation** - Full keyboard accessibility (Tab, Enter, Space)
- **Focus Management** - Clear visual focus indicators on all interactive elements
- **Reduced Motion** - Respects `prefers-reduced-motion` CSS media query
- **Color Contrast** - High contrast ratios for text and interactive elements
- **Modal Dialog** - Completion modal has proper ARIA attributes

## Game Logic

### State Management
- `cards` - Array of card objects with emoji, flipped, and matched status
- `attempts` - Number of pair reveals
- `flippedIndices` - Indices of currently flipped cards
- `matchedIndices` - Set of indices for matched cards
- `isProcessing` - Prevents card flips during comparison delay

### Key Algorithms
- **Fisher-Yates Shuffle** - Randomizes card order with uniform distribution
- **Card Matching** - Compares two flipped cards; resets after 1 second if no match
- **Game Completion** - Tracks when all pairs are matched

## Optional Features Implemented

### Best Score Tracking
- Saves best score to browser `localStorage` under key `memoryGameBestScore`
- Displays on the grid size selection screen
- Updates only if current game has fewer attempts than best score

### Responsive Design
- Mobile-first approach with breakpoints at 640px and 480px
- Touch-friendly card sizes
- Optimized layout for all screen sizes
- Flexible grid that adapts to container

### Visual Enhancements
- Gradient backgrounds and card animations
- 3D flip transitions with CSS transforms
- Matched card color change (green gradient)
- Modal dialog for game completion
- Smooth transitions and hover effects

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## AI Usage Disclosure

### Tools Used
- **GitHub Copilot** - Code generation and implementation assistance

### What AI Was Used For
1. **Component Structure** - Initial Vue 3 component scaffolding and layout
2. **Game Logic** - Card shuffling algorithm, match detection, game state management
3. **Styling** - CSS Grid layouts, animations, responsive design patterns
4. **Accessibility Features** - ARIA labels, semantic HTML structure, keyboard event handlers

### Code Attribution

**AI-Assisted Components:**
- `src/components/GameBoard.vue` - Primary game logic, card flip mechanics, animation handling
- `src/components/GridSizeSelector.vue` - Grid selection UI and styling
- `src/style.css` - Global styles and accessibility utilities

**AI-Assisted Features:**
- Fisher-Yates shuffle algorithm for card randomization
- 3D card flip animations using CSS transforms
- Modal transition and completion dialog
- Responsive grid layout with media queries
- Keyboard event handling for accessibility
- localStorage integration for best score tracking

**Code I Wrote/Modified:**
- Overall project architecture and Vite configuration
- Vue app initialization and root component setup
- State management flow between components
- Component API design and props/emits communication
- Testing and debugging of game mechanics

### How AI Was Used

The AI assisted primarily with:
- **Generation** - Creating boilerplate component structure and styling frameworks
- **Explanation** - Helping understand Vue 3 Composition API patterns
- **Optimization** - Suggesting performance improvements for card rendering
- **Documentation** - Drafting accessibility features and inline code comments

I validated all AI-generated code, tested thoroughly, and made significant modifications to ensure:
- Correct game mechanics and state management
- Accessibility standards compliance
- Performance optimization
- Code clarity and maintainability

## Development Notes

### Performance Considerations
- Cards use CSS transforms for animations (GPU-accelerated)
- Event listeners are properly cleaned up
- No unnecessary re-renders due to Vue 3's reactivity system

### Future Enhancements
- Sound effects for card flips and matches
- Multiplayer support with score comparison
- Different card themes (animals, numbers, flags, etc.)
- Difficulty levels with time limits
- Game statistics and history tracking
- PWA support for offline play

## Testing

The game has been tested for:
- ✅ Game mechanics (matching, flipping, completion)
- ✅ Keyboard navigation and accessibility
- ✅ Responsive design on mobile and desktop
- ✅ localStorage functionality
- ✅ Browser compatibility

## License

This project is provided as-is for evaluation purposes.

## Questions?

For questions about the code or AI usage, please refer to the AI Usage Disclosure section above.
