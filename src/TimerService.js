import { TimerModel } from './TimerModel';

export class TimerService {
  static async loadTimers() {
    try {
      // In a desktop app, we'll load from the timers.json file
      const response = await fetch('./timers.json');
      if (!response.ok) {
        throw new Error('Failed to load timers.json');
      }
      const jsonData = await response.json();
      return jsonData.map(timer => TimerModel.fromJson(timer));
    } catch (error) {
      console.warn('Failed to load timers.json, using defaults:', error);
      // Fallback to default timers if file loading fails
      return [
        new TimerModel('Dataverse Review', 30),
        new TimerModel('Power Apps Review', 900),
        new TimerModel('Power Automate Review', 900),
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