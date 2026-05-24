<script setup lang="ts">
interface Card {
  emoji: string
  flipped: boolean
  matched: boolean
}

const props = defineProps<{
  card: Card
  index: number
}>()

const emit = defineEmits<{
  'card-flip': [index: number]
}>()

const handleFlip = (): void => {
  emit('card-flip', props.index)
}
</script>

<template>
  <div class="card-wrapper">
    <button
      @click="handleFlip"
      @keypress.enter="handleFlip"
      @keypress.space="handleFlip"
      :disabled="props.card.matched"
      :aria-label="`Card ${props.index + 1}, ${
        props.card.matched ? 'matched' : props.card.flipped ? 'revealed' : 'hidden'
      }`"
      :aria-pressed="props.card.flipped"
      class="card"
      :class="{ flipped: props.card.flipped, matched: props.card.matched }"
    >
      <div class="card-inner">
        <div class="card-front" aria-hidden="true">?</div>
        <div class="card-back" aria-hidden="true">
          <span class="card-emoji">{{ props.card.emoji }}</span>
        </div>
      </div>
    </button>
  </div>
</template>