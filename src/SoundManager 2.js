class SoundManager {
  constructor() {
    this.audioContext = null;
    this.soundEnabled = true;
    this.sounds = {
      timerStart: true,
      timerEnd: true,
      warning: true,
      overtime: true
    };
  }

  async initialize() {
    try {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    } catch (error) {
      console.warn('Could not initialize audio context:', error);
    }
  }

  updateSettings(soundSettings) {
    this.sounds = { ...this.sounds, ...soundSettings };
  }

  // Create a simple beep sound using Web Audio API
  createBeep(frequency = 800, duration = 200, volume = 0.3) {
    if (!this.audioContext || !this.soundEnabled) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);
    
    oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(volume, this.audioContext.currentTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration / 1000);
    
    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + duration / 1000);
  }

  // Different sound patterns for different events
  playTimerStart() {
    if (this.sounds.timerStart) {
      this.createBeep(600, 150, 0.2);
    }
  }

  playTimerEnd() {
    if (this.sounds.timerEnd) {
      // Three ascending beeps
      this.createBeep(800, 200, 0.3);
      setTimeout(() => this.createBeep(1000, 200, 0.3), 250);
      setTimeout(() => this.createBeep(1200, 300, 0.3), 500);
    }
  }

  playWarning() {
    if (this.sounds.warning) {
      // Two quick beeps
      this.createBeep(1000, 150, 0.4);
      setTimeout(() => this.createBeep(1000, 150, 0.4), 200);
    }
  }

  playOvertime() {
    if (this.sounds.overtime) {
      // Low frequency warning sound
      this.createBeep(400, 300, 0.4);
      setTimeout(() => this.createBeep(300, 300, 0.4), 350);
    }
  }

  // Play system notification sound (fallback)
  playSystemBeep() {
    try {
      // Try to play system beep on desktop
      if (window.require) {
        const { shell } = window.require('electron');
        shell.beep();
      }
    } catch (error) {
      // Fallback to creating a simple beep
      this.createBeep(800, 200, 0.3);
    }
  }
}

// Create and export singleton instance
const soundManager = new SoundManager();

// Initialize when the module is loaded
soundManager.initialize();

export default soundManager;