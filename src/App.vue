<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useGameStore } from './stores/gameStore'
import GridSizeSelector from './components/GridSizeSelector.vue'
import GameBoard from './components/GameBoard.vue'

const gameStore = useGameStore()
const gameStarted = ref<boolean>(false)
const gridSize = ref<number>(4)
const isDarkMode = ref<boolean>(false)

gameStore.loadScores()

const toggleDarkMode = (): void => {
  isDarkMode.value = !isDarkMode.value
  localStorage.setItem('cardFlipDarkMode', JSON.stringify(isDarkMode.value))
}

const startGame = (size: number): void => {
  gridSize.value = size
  gameStarted.value = true
  gameStore.startTimer()
}

const resetGame = (): void => {
  gameStore.stopTimer()
  gameStarted.value = false
}

onMounted(() => {
  const savedDarkMode = localStorage.getItem('cardFlipDarkMode')
  if (savedDarkMode) {
    isDarkMode.value = JSON.parse(savedDarkMode)
  }
})
</script>

<template>
  <div class="app" :class="{ 'dark-mode': isDarkMode }">
    <header class="app-header">
      <h1>Card Flip</h1>
      <button
        @click="toggleDarkMode"
        :title="isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'"
        class="theme-toggle"
        :aria-label="
          isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'
        "
      >
        {{ isDarkMode ? '☀️' : '🌙' }}
      </button>
    </header>

    <main class="app-main">
      <GridSizeSelector v-if="!gameStarted" @start-game="startGame" />

      <GameBoard
        v-if="gameStarted"
        :grid-size="gridSize"
        @reset-game="resetGame"
      />
    </main>

    <footer class="app-footer">
      <p>&copy; 2026 Card Flip</p>
    </footer>
  </div>
</template>
