import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import StageTimerApp from './StageTimerApp';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(<StageTimerApp />);