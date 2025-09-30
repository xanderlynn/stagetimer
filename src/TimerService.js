import { TimerModel } from './TimerModel';

export class TimerService {
  static async loadTimers() {
    try {
      // Check if we have saved timers in localStorage first
      const savedTimers = localStorage.getItem('stage-timer-data');
      if (savedTimers) {
        const jsonData = JSON.parse(savedTimers);
        return jsonData.map(timer => TimerModel.fromJson(timer));
      }

      // Try to load from timers.json file (fallback)
      const response = await fetch('./timers.json');
      if (!response.ok) {
        throw new Error('Failed to load timers.json');
      }
      const jsonData = await response.json();
      return jsonData.map(timer => TimerModel.fromJson(timer));
    } catch (error) {
      console.warn('Failed to load timers, using defaults:', error);
      // Fallback to default timers if file loading fails
      return [
        new TimerModel('Presentation', 1800),
        new TimerModel('Q&A', 300),
        new TimerModel('Break', 900),
        new TimerModel('Setup', 600),
      ];
    }
  }

  static saveTimers(timers) {
    // For a desktop app, we could implement file saving functionality
    // For now, we'll just store in localStorage as a fallback
    const timerData = timers.map(timer => timer.toJson());
    localStorage.setItem('stage-timer-data', JSON.stringify(timerData));
  }

  static loadSavedTimers() {
    try {
      const saved = localStorage.getItem('stage-timer-data');
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.map(timer => TimerModel.fromJson(timer));
      }
    } catch (error) {
      console.warn('Failed to load saved timers:', error);
    }
    return null;
  }
}