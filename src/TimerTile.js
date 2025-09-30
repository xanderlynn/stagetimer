import React from 'react';
import { View, Text, StyleSheet } from 'react-native-web';

const TimerTile = ({ timer, onToggle, onArchive, customColors = {}, isHighlighted = false }) => {
  // Calculate progress as elapsed time (0% to 100% as time progresses)
  const elapsedTime = timer.initialTime - timer.timeRemaining;
  const progress = Math.max(0, Math.min(1, elapsedTime / timer.initialTime));
  const isOvertime = timer.timeRemaining < 0;
  
  // Use custom colors if provided, otherwise fall back to defaults
  const colors = {
    running: customColors.running || 'rgba(0, 85, 0, 0.8)',
    warning: customColors.warning || 'rgba(85, 0, 0, 0.8)',
    overtime: customColors.overtime || 'rgba(0, 0, 85, 0.8)'
  };

  const getProgressColor = () => {
    if (!timer.isRunning) {
      // Show muted color when paused, but keep it visible
      if (isOvertime) return colors.overtime;
      if (timer.timeRemaining <= 60) return colors.warning;
      return colors.running;
    }
    if (isOvertime) return colors.overtime;
    if (timer.timeRemaining <= 60) return colors.warning;
    return colors.running;
  };

  const getContainerBackground = () => {
    if (timer.isArchived) {
      return 'rgba(128, 128, 128, 0.3)'; // Grayed out for archived
    }
    return 'rgba(255, 255, 255, 0.1)'; // Slight background for active timers
  };

  const handleRightClick = (e) => {
    e.preventDefault();
    if (onArchive && !timer.isArchived) {
      onArchive();
    }
  };

  return (
    <View 
      style={[styles.container, { backgroundColor: getContainerBackground() }]}
      onContextMenu={handleRightClick}
    >
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
                  opacity: timer.isRunning ? 0.7 : 0.5  // Keep progress visible when paused
                }
              ]} 
            />
            
            {/* Text overlay */}
            <View style={styles.textOverlay}>
              <Text style={[styles.titleText, timer.isArchived && styles.archivedText]} numberOfLines={1}>
                {timer.title} {timer.isArchived ? '(Archived)' : ''}
              </Text>
              <Text style={[styles.timeText, timer.isArchived && styles.archivedText]}>
                {timer.formattedTime}
              </Text>
            </View>
          </View>
        </View>
        
        {/* Circular button - only show for non-archived timers */}
        {!timer.isArchived && (
          <View 
            style={[
              styles.circleButton,
              { 
                backgroundColor: timer.isRunning ? '#FF5722' : '#4CAF50'
              }
            ]}
            onClick={onToggle}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 2,
    borderRadius: 6,
    overflow: 'hidden',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    WebkitAppRegion: 'drag',  // Allow dragging on timer containers
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    minHeight: 36,
    WebkitAppRegion: 'drag',  // Allow dragging on timer content
  },
  mainSection: {
    flex: 1,
    marginRight: 8,
  },
  textContainer: {
    position: 'relative',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 4,
    overflow: 'hidden',
    minHeight: 24,
    border: '1px solid rgba(255, 255, 255, 0.1)',
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
    backgroundColor: 'rgba(0, 0, 0, 0.2)',  // Semi-transparent background for text
    borderRadius: 3,
  },
  titleText: {
    color: 'white',
    fontSize: 11,
    fontWeight: 'bold',
    flex: 1,
    marginRight: 8,
    textShadow: '0 0 4px rgba(0,0,0,1), 0 1px 2px rgba(0,0,0,0.8)',
    WebkitTextStroke: '0.5px rgba(0,0,0,0.5)',
  },
  timeText: {
    color: 'white',
    fontSize: 11,
    fontWeight: 'bold',
    fontFamily: 'monospace',
    minWidth: 50,
    textAlign: 'right',
    textShadow: '0 0 4px rgba(0,0,0,1), 0 1px 2px rgba(0,0,0,0.8)',
    WebkitTextStroke: '0.5px rgba(0,0,0,0.5)',
  },
  archivedText: {
    opacity: 0.6,
    fontStyle: 'italic',
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