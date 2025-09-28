import React from 'react';
import { View, Text, StyleSheet } from 'react-native-web';

const TimerTile = ({ timer, onToggle, customColors = {}, isHighlighted = false }) => {
  const progress = Math.max(0, Math.min(1, timer.timeRemaining / timer.initialTime));
  const isOvertime = timer.timeRemaining < 0;
  
  // Use custom colors if provided, otherwise fall back to defaults
  const colors = {
    running: customColors.running || 'rgba(0, 85, 0, 0.8)',
    warning: customColors.warning || 'rgba(85, 0, 0, 0.8)',
    overtime: customColors.overtime || 'rgba(0, 0, 85, 0.8)'
  };

  const getBackgroundColor = () => {
    if (!timer.isRunning) {
      return 'transparent';
    }
    
    if (timer.timeRemaining < 0) {
      return colors.overtime;
    } else if (timer.timeRemaining <= 60) {
      return colors.warning;
    } else {
      return colors.running;
    }
  };

  const getProgressColor = () => {
    if (!timer.isRunning) return 'rgba(255, 255, 255, 0.3)';
    if (isOvertime) return colors.overtime;
    if (timer.timeRemaining <= 60) return colors.warning;
    return colors.running;
  };

  return (
    <View style={[styles.container, { backgroundColor: getBackgroundColor() }]}>
      <View style={styles.content}>
        <View style={styles.mainSection}>
          {/* Progress bar as background with text overlay */}
          <View style={styles.textContainer}>
            {/* Background progress bar */}
            <View 
              style={[
                styles.backgroundProgressBar,
                { 
                  width: isOvertime ? '100%' : `${progress * 100}%`,
                  backgroundColor: getProgressColor(),
                  opacity: isOvertime ? 0.3 : 0.2
                }
              ]} 
            />
            
            {/* Text overlay */}
            <View style={styles.textOverlay}>
              <Text style={styles.titleText} numberOfLines={1}>
                {timer.title}
              </Text>
              <Text style={styles.timeText}>
                {timer.formattedTime}
              </Text>
            </View>
          </View>
        </View>
        
        {/* Circular button */}
        <View 
          style={[
            styles.circleButton,
            { 
              backgroundColor: timer.isRunning ? '#FF5722' : '#4CAF50'
            }
          ]}
          onClick={onToggle}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 2,
    borderRadius: 6,
    overflow: 'hidden',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    minHeight: 36,
  },
  mainSection: {
    flex: 1,
    marginRight: 8,
  },
  textContainer: {
    position: 'relative',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 4,
    overflow: 'hidden',
    minHeight: 24,
  },
  backgroundProgressBar: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    borderRadius: 4,
    transition: 'width 0.3s ease-in-out',
  },
  textOverlay: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    position: 'relative',
    zIndex: 1,
  },
  titleText: {
    color: 'white',
    fontSize: 11,
    fontWeight: 'bold',
    flex: 1,
    marginRight: 8,
    textShadow: '0 1px 2px rgba(0,0,0,0.8)',
  },
  timeText: {
    color: 'white',
    fontSize: 11,
    fontWeight: 'bold',
    fontFamily: 'monospace',
    minWidth: 50,
    textAlign: 'right',
    textShadow: '0 1px 2px rgba(0,0,0,0.8)',
  },
  circleButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    cursor: 'pointer',
    WebkitAppRegion: 'no-drag',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s ease',
  },
});

export default TimerTile;