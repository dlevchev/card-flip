<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useGameStore } from '../stores/gameStore'
import { soundEffects } from '../utils/soundEffects'
import Card from './Card.vue'

interface Card {
  emoji: string
  flipped: boolean
  matched: boolean
}

const props = defineProps<{
  gridSize: number
}>()

const emit = defineEmits<{
  'reset-game': []
}>()

const gameStore = useGameStore()
const cards = ref<Card[]>([])
const flippedIndices = ref<number[]>([])
const matchedIndices = ref<Set<number>>(new Set())
const attempts = ref<number>(0)
const isProcessing = ref<boolean>(false)
const gameComplete = ref<boolean>(false)
const isNewRecord = ref<boolean>(false)
const isMuted = ref<boolean>(false)

const emojis = [
  '🐶',
  '🐱',
  '🐰',
  '🦊',
  '🐻',
  '🐼',
  '🐨',
  '🐯',
  '🦁',
  '🐸',
  '🦋',
  '🐝',
]

const totalCards = computed(() => props.gridSize * props.gridSize)
const totalPairs = computed(() => totalCards.value / 2)
const matchedPairs = computed(() => matchedIndices.value.size / 2)
const bestAttempts = computed(() => {
  const bestScore = gameStore.getBestScore(props.gridSize.toString())
  return bestScore ? bestScore.attempts : '-'
})

const initializeGame = (): void => {
  const numPairs = totalCards.value / 2
  const selectedEmojis = emojis.slice(0, numPairs)
  const gameEmojis = [...selectedEmojis, ...selectedEmojis]

  // Fisher-Yates shuffle
  for (let i = gameEmojis.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[gameEmojis[i], gameEmojis[j]] = [gameEmojis[j], gameEmojis[i]]
  }

  cards.value = gameEmojis.map((emoji) => ({
    emoji,
    flipped: false,
    matched: false,
  }))

  flippedIndices.value = []
  matchedIndices.value.clear()
  attempts.value = 0
  isProcessing.value = false
  gameComplete.value = false
  isNewRecord.value = false
}

const flipCard = (index: number): void => {
  if (
    isProcessing.value ||
    cards.value[index].matched ||
    cards.value[index].flipped
  ) {
    return
  }

  flippedIndices.value.push(index)
  cards.value[index].flipped = true
  soundEffects.play('flip')

  if (flippedIndices.value.length === 2) {
    isProcessing.value = true
    attempts.value++
    checkMatch()
  }
}

const checkMatch = async (): Promise<void> => {
  const [firstIndex, secondIndex] = flippedIndices.value
  const firstCard = cards.value[firstIndex]
  const secondCard = cards.value[secondIndex]

  if (firstCard.emoji === secondCard.emoji) {
    firstCard.matched = true
    secondCard.matched = true
    matchedIndices.value.add(firstIndex)
    matchedIndices.value.add(secondIndex)
    flippedIndices.value = []
    isProcessing.value = false
    soundEffects.play('match')

    if (matchedIndices.value.size === totalCards.value) {
      gameStore.stopTimer()
      gameComplete.value = true
      isNewRecord.value = gameStore.updateScore(
        props.gridSize,
        attempts.value,
        gameStore.gameTimer
      )
      soundEffects.play(isNewRecord.value ? 'newRecord' : 'complete')
    }
  } else {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    firstCard.flipped = false
    secondCard.flipped = false
    flippedIndices.value = []
    isProcessing.value = false
    soundEffects.play('mismatch')
  }
}

const resetGame = (): void => {
  gameStore.resetTimer()
  emit('reset-game')
}

const playAgain = (): void => {
  gameStore.resetTimer()
  gameStore.startTimer()
  initializeGame()
}

const toggleSound = (): void => {
  isMuted.value = !isMuted.value
  soundEffects.setMuted(isMuted.value)
}

onMounted(() => {
  initializeGame()
  isMuted.value = soundEffects.isMutedValue()
})

onUnmounted(() => {
  gameStore.stopTimer()
})
</script>

<template>
  <div class="game-container">
    <div class="game-header">
      <div class="stats">
        <div class="stat-item">
          <span class="stat-label">Time</span>
          <span class="stat-value">{{
            gameStore.formatTime(gameStore.gameTimer)
          }}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">Attempts</span>
          <span class="stat-value">{{ attempts }}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">Matched</span>
          <span class="stat-value">{{ matchedPairs }} / {{ totalPairs }}</span>
        </div>
      </div>
      <button
        @click="resetGame"
        class="reset-button"
        aria-label="Reset the game"
      >
        Reset
      </button>
    </div>

    <div
      class="game-board"
      :style="{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }"
      role="main"
      aria-label="Memory game board"
    >
      <Card
        v-for="(card, index) in cards"
        :key="index"
        :card="card"
        :index="index"
        @card-flip="flipCard"
      />
    </div>

    <button
      @click="toggleSound"
      :title="isMuted ? 'Unmute sound' : 'Mute sound'"
      class="sound-toggle-button"
      :aria-label="isMuted ? 'Unmute sound' : 'Mute sound'"
    >
      {{ isMuted ? '🔇' : '🔊' }}
    </button>

    <transition name="modal">
      <div
        v-if="gameComplete"
        class="completion-modal"
        role="alertdialog"
        aria-labelledby="completion-title"
      >
        <div class="completion-content">
          <h2 id="completion-title">🎉 Congratulations!</h2>
          <p class="completion-message">
            You completed the game in
            <strong>{{ attempts }}</strong> attempt<span v-if="attempts !== 1"
              >s</span
            >
            and <strong>{{ gameStore.formatTime(gameStore.gameTimer) }}</strong>
          </p>
          <div v-if="isNewRecord" class="new-record-badge">🏆 NEW RECORD!</div>
          <div class="completion-stats">
            <div class="stat-box">
              <span class="stat-label">Grid Size</span>
              <span class="stat-value">{{ gridSize }}×{{ gridSize }}</span>
            </div>
            <div class="stat-box">
              <span class="stat-label">Best Score</span>
              <span class="stat-value">{{ bestAttempts }}</span>
            </div>
          </div>
          <button
            @click="playAgain"
            class="play-again-button"
            aria-label="Play again"
          >
            Play Again
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>
