class SoundManager {
  constructor() {
    this.audioContext = null;
    this.settings = {
      timerStart: true,
      timerEnd: true,
      warning: true,
      overtime: true
    };
    
    // Initialize audio context on first user interaction
    this.initializeAudio();
  }

  async initializeAudio() {
    try {
      // Create AudioContext when needed
      if (!this.audioContext) {
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      }
      
      // Resume context if suspended
      if (this.audioContext.state === 'suspended') {
        await this.audioContext.resume();
      }
    } catch (error) {
      console.warn('Failed to initialize audio context:', error);
    }
  }

  async playTone(frequency, duration, type = 'sine') {
    if (!this.audioContext) {
      await this.initializeAudio();
    }
    
    if (!this.audioContext) return;

    try {
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);

      oscillator.frequency.value = frequency;
      oscillator.type = type;

      // Create envelope
      const now = this.audioContext.currentTime;
      gainNode.gain.setValueAtTime(0, now);
      gainNode.gain.linearRampToValueAtTime(0.1, now + 0.01); // Quick attack
      gainNode.gain.exponentialRampToValueAtTime(0.01, now + duration); // Decay

      oscillator.start(now);
      oscillator.stop(now + duration);
    } catch (error) {
      console.warn('Failed to play tone:', error);
    }
  }

  async playMultipleTones(tones) {
    for (let i = 0; i < tones.length; i++) {
      const { frequency, duration, delay = 0 } = tones[i];
      
      if (delay > 0) {
        await new Promise(resolve => setTimeout(resolve, delay));
      }
      
      await this.playTone(frequency, duration);
      
      // Small gap between tones
      if (i < tones.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 50));
      }
    }
  }

  async playTimerStart() {
    if (!this.settings.timerStart) return;
    
    // Rising tone sequence for start
    await this.playMultipleTones([
      { frequency: 440, duration: 0.15 },
      { frequency: 554, duration: 0.15 },
      { frequency: 659, duration: 0.2 }
    ]);
  }

  async playTimerEnd() {
    if (!this.settings.timerEnd) return;
    
    // Three-tone chime for end
    await this.playMultipleTones([
      { frequency: 800, duration: 0.3 },
      { frequency: 600, duration: 0.3 },
      { frequency: 400, duration: 0.4 }
    ]);
  }

  async playWarning() {
    if (!this.settings.warning) return;
    
    // Double beep for warning (60 seconds left)
    await this.playMultipleTones([
      { frequency: 880, duration: 0.2 },
      { frequency: 880, duration: 0.2, delay: 100 }
    ]);
  }

  async playOvertime() {
    if (!this.settings.overtime) return;
    
    // Rapid beeping for overtime
    await this.playMultipleTones([
      { frequency: 1000, duration: 0.1 },
      { frequency: 1000, duration: 0.1, delay: 80 },
      { frequency: 1000, duration: 0.1, delay: 80 },
      { frequency: 1000, duration: 0.1, delay: 80 }
    ]);
  }

  updateSettings(newSettings) {
    this.settings = { ...this.settings, ...newSettings };
  }

  // Method to enable audio after user interaction
  async enableAudio() {
    await this.initializeAudio();
  }
}

// Create singleton instance
const soundManager = new SoundManager();

// Enable audio on any user interaction
document.addEventListener('click', () => {
  soundManager.enableAudio();
}, { once: true });

export default soundManager;