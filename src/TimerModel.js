export class TimerModel {
  constructor(title, initialTime, timeRemaining = null, isRunning = false, isArchived = false) {
    this.title = title;
    this.initialTime = initialTime;
    this.timeRemaining = timeRemaining !== null ? timeRemaining : initialTime;
    this.isRunning = isRunning;
    this.isArchived = isArchived;
  }

  static fromJson(json) {
    return new TimerModel(json.title, json.time, json.timeRemaining, json.isRunning, json.isArchived);
  }

  toJson() {
    return {
      title: this.title,
      time: this.initialTime,
      timeRemaining: this.timeRemaining,
      isRunning: this.isRunning,
      isArchived: this.isArchived
    };
  }

  get formattedTime() {
    const isNegative = this.timeRemaining < 0;
    const absSeconds = Math.abs(this.timeRemaining);
    const minutes = Math.floor(absSeconds / 60);
    const seconds = absSeconds % 60;
    
    const sign = isNegative ? '-' : '';
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = seconds.toString().padStart(2, '0');
    
    return `${sign}${formattedMinutes}:${formattedSeconds}`;
  }

  reset() {
    this.timeRemaining = this.initialTime;
    this.isRunning = false;
  }

  toggle() {
    this.isRunning = !this.isRunning;
  }

  pause() {
    this.isRunning = false;
  }

  start() {
    this.isRunning = true;
  }

  tick() {
    if (this.isRunning) {
      this.timeRemaining--;
    }
  }

  archive() {
    this.isArchived = true;
    this.isRunning = false;
  }

  unarchive() {
    this.isArchived = false;
  }

  getBackgroundColor() {
    if (!this.isRunning) {
      return 'transparent';
    }
    
    if (this.timeRemaining < 0) {
      return 'rgba(0, 0, 85, 0.8)'; // Dark blue for overtime
    } else if (this.timeRemaining <= 60) {
      return 'rgba(85, 0, 0, 0.8)'; // Dark red for final minute
    } else {
      return 'rgba(0, 85, 0, 0.8)'; // Dark green for running
    }
  }
}