type SoundType = 'flip' | 'match' | 'mismatch' | 'complete' | 'newRecord'

class SoundEffects {
  private isMuted: boolean = false
  private audioElements: Map<SoundType, HTMLAudioElement> = new Map()

  constructor() {
    this.initAudio()
  }

  private initAudio(): void {
    if (typeof window === 'undefined') return

    const soundMap: Record<SoundType, string> = {
      match: '/assets/sounds/match.mp3',
      mismatch: '/assets/sounds/no-match.mp3',
      complete: '/assets/sounds/win.mp3',
      newRecord: '/assets/sounds/win.mp3',
    }

    Object.entries(soundMap).forEach(([key, path]) => {
      const audio = new Audio(path)
      audio.preload = 'auto'
      this.audioElements.set(key as SoundType, audio)
    })
  }

  play(type: SoundType): void {
    if (this.isMuted) return

    const audio = this.audioElements.get(type)
    if (audio) {
      audio.currentTime = 0
      audio.play().catch((err) => {
        console.error(`Failed to play sound ${type}:`, err)
      })
    }
  }

  toggleMute(): void {
    this.isMuted = !this.isMuted
  }

  setMuted(muted: boolean): void {
    this.isMuted = muted
  }

  isMutedValue(): boolean {
    return this.isMuted
  }
}

export const soundEffects = new SoundEffects()
