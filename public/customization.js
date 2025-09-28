// Global state
let settings = {
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
};
let timers = [];

// Initialize the customization window
async function init() {
    try {
        const data = await window.electronAPI.getSettingsData();
        if (data) {
            settings = { ...settings, ...data.settings };
            timers = data.timers || [];
        }
        
        loadSettings();
        hideLoading();
        switchTab('colors');
    } catch (error) {
        console.error('Failed to load settings:', error);
        hideLoading();
        switchTab('colors');
    }
}

function hideLoading() {
    document.getElementById('loading').style.display = 'none';
}

function switchTab(tabName) {
    // Update tab buttons
    document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelector(`.tab[onclick="switchTab('${tabName}')"]`).classList.add('active');
    
    // Update tab content
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    document.getElementById(tabName).classList.add('active');
    
    // Load specific content
    if (tabName === 'timers') {
        renderTimers();
    }
}

function loadSettings() {
    // Load colors
    Object.keys(settings.colors).forEach(colorType => {
        const input = document.getElementById(`color-${colorType}`);
        const value = document.getElementById(`color-${colorType}-value`);
        if (input && value) {
            input.value = settings.colors[colorType];
            value.textContent = settings.colors[colorType];
        }
    });
    
    // Load sounds
    Object.keys(settings.sounds).forEach(soundType => {
        const checkbox = document.getElementById(`sound-${soundType}`);
        if (checkbox) {
            checkbox.checked = settings.sounds[soundType];
        }
    });
}

function updateColor(colorType, value) {
    settings.colors[colorType] = value;
    document.getElementById(`color-${colorType}-value`).textContent = value;
}

function updateSound(soundType, enabled) {
    settings.sounds[soundType] = enabled;
}

function renderTimers() {
    const container = document.getElementById('timers-list');
    container.innerHTML = '';
    
    timers.forEach((timer, index) => {
        const timerDiv = document.createElement('div');
        timerDiv.className = 'timer-item';
        timerDiv.innerHTML = `
            <div class="timer-header">
                <span class="timer-index">#${index + 1}</span>
                <button class="remove-timer-btn" onclick="removeTimer(${index})">Remove</button>
            </div>
            <div class="input-group">
                <label class="input-label">Title:</label>
                <input type="text" class="text-input" value="${timer.title}" onchange="updateTimer(${index}, 'title', this.value)">
            </div>
            <div class="input-group">
                <label class="input-label">Time (seconds):</label>
                <input type="number" class="number-input" value="${timer.initialTime || timer.time}" onchange="updateTimer(${index}, 'time', parseInt(this.value))">
            </div>
        `;
        container.appendChild(timerDiv);
    });
}

function addTimer() {
    timers.push({
        title: 'New Timer',
        initialTime: 300,
        time: 300,
        timeRemaining: 300,
        isRunning: false
    });
    renderTimers();
}

function removeTimer(index) {
    timers.splice(index, 1);
    renderTimers();
}

function updateTimer(index, field, value) {
    if (field === 'time') {
        timers[index].initialTime = value;
        timers[index].time = value;
        timers[index].timeRemaining = value;
    } else {
        timers[index][field] = value;
    }
}

async function saveSettings() {
    try {
        const data = {
            settings,
            timers
        };
        
        await window.electronAPI.saveSettingsData(data);
        await closeWindow();
    } catch (error) {
        console.error('Failed to save settings:', error);
        alert('Failed to save settings. Please try again.');
    }
}

async function closeWindow() {
    try {
        await window.electronAPI.closeCustomization();
    } catch (error) {
        console.error('Failed to close window:', error);
    }
}

// Initialize when page loads
window.addEventListener('DOMContentLoaded', init);