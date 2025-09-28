import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native-web';
import TimerTile from './TimerTile';
import { TimerService } from './TimerService';
import { TimerModel } from './TimerModel';
import soundManager from './SoundManager';

const StageTimerApp = () => {
  const [timers, setTimers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [settings, setSettings] = useState({
    colors: {
      running: '#005500',
      warning: '#550000', 
      overtime: '#000055'
    },
    sounds: {
      timerStart: true,
      timerEnd: true,
      warning: true,
      overtime: true
    }
  });
  const [previousTimerStates, setPreviousTimerStates] = useState({});
  const [updateInterval, setUpdateInterval] = useState(null);

  useEffect(() => {
    loadTimers();
    loadSettings();
    exposeDataToElectron();
    
    // Cleanup interval on unmount
    return () => {
      if (updateInterval) {
        clearInterval(updateInterval);
        setUpdateInterval(null);
      }
    };
  }, []);

  // Start timer after timers are loaded
  useEffect(() => {
    if (timers.length > 0) {
      startUpdateTimer();
    }
  }, [timers.length]);

  // Update sound manager settings when settings change
  useEffect(() => {
    soundManager.updateSettings(settings.sounds);
  }, [settings.sounds]);

  const setupElectronListeners = () => {
    // No longer needed since customization opens in separate window
  };

  const exposeDataToElectron = () => {
    // Expose functions to Electron for IPC communication
    window.getAppData = () => {
      return {
        settings,
        timers: timers.map(timer => ({
          title: timer.title,
          initialTime: timer.initialTime,
          time: timer.initialTime, // For backward compatibility
          timeRemaining: timer.timeRemaining,
          isRunning: timer.isRunning
        }))
      };
    };

    window.updateAppData = (data) => {
      if (data.settings) {
        setSettings(data.settings);
        saveSettings(data.settings);
      }
      if (data.timers) {
        updateTimers(data.timers);
      }
    };
  };
  const loadSettings = () => {
    try {
      const savedSettings = localStorage.getItem('stage-timer-settings');
      if (savedSettings) {
        const parsed = JSON.parse(savedSettings);
        setSettings(prev => ({ ...prev, ...parsed }));
      }
    } catch (error) {
      console.warn('Failed to load settings:', error);
    }
  };

  const saveSettings = (newSettings) => {
    localStorage.setItem('stage-timer-settings', JSON.stringify(newSettings));
    setSettings(newSettings);
  };

  const loadTimers = async () => {
    try {
      const loadedTimers = await TimerService.loadTimers();
      setTimers(loadedTimers);
      
      // Initialize previous states tracking
      const initialStates = {};
      loadedTimers.forEach((timer, index) => {
        initialStates[index] = {
          timeRemaining: timer.timeRemaining,
          isRunning: timer.isRunning,
          wasWarning: false,
          wasOvertime: false
        };
      });
      setPreviousTimerStates(initialStates);
      
      setIsLoading(false);
    } catch (error) {
      console.error('Failed to load timers:', error);
      setIsLoading(false);
    }
  };

  const startUpdateTimer = () => {
    if (updateInterval) {
      clearInterval(updateInterval);
    }
    
    const intervalId = setInterval(() => {
      setTimers(currentTimers => {
        const updatedTimers = [...currentTimers];
        updatedTimers.forEach((timer, index) => {
          const prevState = previousTimerStates[index];
          if (!prevState) return;

          timer.tick();
          
          // Check for sound notifications
          if (timer.isRunning) {
            // Timer just reached 60 seconds (warning)
            if (timer.timeRemaining === 60 && !prevState.wasWarning) {
              soundManager.playWarning();
              prevState.wasWarning = true;
            }
            
            // Timer just reached 0 (end)
            if (timer.timeRemaining === 0 && prevState.timeRemaining > 0) {
              soundManager.playTimerEnd();
            }
            
            // Timer just went into overtime
            if (timer.timeRemaining === -1 && !prevState.wasOvertime) {
              soundManager.playOvertime();
              prevState.wasOvertime = true;
            }
          }
          
          // Update previous state
          prevState.timeRemaining = timer.timeRemaining;
          prevState.isRunning = timer.isRunning;
        });
        return updatedTimers;
      });
    }, 1000);
    
    setUpdateInterval(intervalId);
  };

  const toggleTimer = (index) => {
    setTimers(currentTimers => {
      const updatedTimers = [...currentTimers];
      const selectedTimer = updatedTimers[index];
      
      if (selectedTimer.isRunning) {
        // Pause the selected timer
        selectedTimer.pause();
      } else {
        // Pause all other timers first
        updatedTimers.forEach(timer => timer.pause());
        // Start the selected timer
        selectedTimer.start();
        
        // Play start sound
        soundManager.playTimerStart();
        
        // Reset warning/overtime flags for this timer
        const prevState = previousTimerStates[index];
        if (prevState) {
          prevState.wasWarning = selectedTimer.timeRemaining <= 60;
          prevState.wasOvertime = selectedTimer.timeRemaining < 0;
        }
      }
      
      return updatedTimers;
    });
  };

  const updateTimers = (newTimers) => {
    const timerModels = newTimers.map(timer => 
      new TimerModel(timer.title, timer.initialTime, timer.timeRemaining, timer.isRunning)
    );
    setTimers(timerModels);
    
    // Update previous states
    const newStates = {};
    timerModels.forEach((timer, index) => {
      newStates[index] = {
        timeRemaining: timer.timeRemaining,
        isRunning: timer.isRunning,
        wasWarning: timer.timeRemaining <= 60,
        wasOvertime: timer.timeRemaining < 0
      };
    });
    setPreviousTimerStates(newStates);
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {timers.map((timer, index) => (
          <TimerTile
            key={`${index}-${timer.timeRemaining}-${timer.isRunning}`}
            timer={timer}
            onToggle={() => toggleTimer(index)}
            customColors={settings.colors}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    WebkitAppRegion: 'drag',  // Make entire window draggable
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 4,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  loadingText: {
    color: 'white',
    fontSize: 16,
  },
});

export default StageTimerApp;