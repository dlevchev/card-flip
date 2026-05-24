import { defineStore } from 'pinia'
import { ref } from 'vue'

interface GameScore {
  gridSize: number
  attempts: number
  time: number
  date: string
}

export const useGameStore = defineStore('game', () => {
  const bestScores = ref<Map<string, GameScore>>(new Map())
  const gameTimer = ref<number>(0)
  const timerInterval = ref<ReturnType<typeof setInterval> | null>(null)

  const loadScores = (): void => {
    const stored = localStorage.getItem('memoryGameScores')
    if (stored) {
      try {
        const scores = JSON.parse(stored)
        bestScores.value = new Map(Object.entries(scores))
      } catch (e) {
        console.error('Failed to load scores:', e)
      }
    }
  }

  const saveScores = (): void => {
    const scoresObj = Object.fromEntries(bestScores.value)
    localStorage.setItem('memoryGameScores', JSON.stringify(scoresObj))
  }

  const updateScore = (
    gridSize: number,
    attempts: number,
    time: number
  ): boolean => {
    const key = gridSize.toString()
    const currentScore = bestScores.value.get(key)

    const isNewRecord =
      !currentScore ||
      attempts < currentScore.attempts ||
      (attempts === currentScore.attempts && time < currentScore.time)

    if (isNewRecord) {
      bestScores.value.set(key, {
        gridSize,
        attempts,
        time,
        date: new Date().toLocaleDateString(),
      })
      saveScores()
    }

    return isNewRecord
  }

  const getBestScore = (gridSize: string): GameScore | undefined => {
    return bestScores.value.get(gridSize)
  }

  const startTimer = (): void => {
    gameTimer.value = 0
    timerInterval.value = setInterval(() => {
      gameTimer.value++
    }, 1000)
  }

  const stopTimer = (): void => {
    if (timerInterval.value) {
      clearInterval(timerInterval.value)
      timerInterval.value = null
    }
  }

  const resetTimer = (): void => {
    stopTimer()
    gameTimer.value = 0
  }

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs
      .toString()
      .padStart(2, '0')}`
  }

  return {
    bestScores,
    gameTimer,
    loadScores,
    saveScores,
    updateScore,
    getBestScore,
    startTimer,
    stopTimer,
    resetTimer,
    formatTime,
  }
})
