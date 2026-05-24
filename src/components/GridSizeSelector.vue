
<script setup lang="ts">
import { computed } from 'vue'
import { useGameStore } from '../stores/gameStore'

const emit = defineEmits<{
  'start-game': [size: number]
}>()

const gameStore = useGameStore()
const sizes = [4, 6]

const selectSize = (size: number): void => {
  emit('start-game', size)
}

const bestScoresDisplay = computed(() => {
  return sizes
    .map((size) => gameStore.getBestScore(size.toString()))
    .filter((score) => score !== undefined)
})

const formatTime = (seconds: number): string => {
  return gameStore.formatTime(seconds)
}
</script>

<template>
  <div class="selector-container">
    <div class="selector-card">
      <h2>Choose Grid Size</h2>
      <p class="description">Select a difficulty level to begin</p>

      <div class="grid-options">
        <button
          v-for="size in sizes"
          :key="size"
          @click="selectSize(size)"
          class="size-button"
          :aria-label="`${size} by ${size} grid, ${(size * size) / 2} pairs`"
        >
          <span class="size-number">{{ size }}×{{ size }}</span>
          <span class="size-subtitle">{{ (size * size) / 2 }} pairs</span>
        </button>
      </div>

      <div v-if="bestScoresDisplay.length > 0" class="best-scores">
        <h3>Best Scores</h3>
        <div
          v-for="score in bestScoresDisplay"
          :key="score.gridSize"
          class="score-item"
        >
          <span class="score-grid"
            >{{ score.gridSize }}×{{ score.gridSize }}</span
          >
          <span class="score-details">
            {{ score.attempts }} attempts · {{ formatTime(score.time) }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
