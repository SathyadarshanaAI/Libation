// 🔮 quamtom/prediction-engine.js — Rule-Based KP Prediction Engine

import { calculateSubLord } from './kp-subload.js';
import { getZodiacPosition } from './chart-engine.js';

// 🧠 Simple predictive keywords per Sub-Lord (can be expanded)
const subLordPredictions = {
  Sun: 'Leadership, confidence, ego matters, vitality',
  Moon: 'Emotions, mind, mother, fluidity in life',
  Mars: 'Aggression, energy, competition, conflict',
  Mercury: 'Communication, intelligence, business, dual nature',
  Jupiter: 'Wisdom, teaching, luck, expansion',
  Venus: 'Love, beauty, marriage, pleasure',
  Saturn: 'Delay, discipline, responsibility, karma',
  Rahu: 'Worldly desires, illusion, obsession, foreign elements',
  Ketu: 'Detachment, past karma, spirituality, confusion'
};

// 📊 Generate prediction based on Moon's degree
function generatePrediction(moonDegree) {
  const subLord = calculateSubLord(moonDegree);
  const prediction = subLordPredictions[subLord] || 'No prediction available.';
  return {
    subLord,
    prediction
  };
}

// 🧪 Example usage:
const moonDeg = 53.2; // e.g., 23.2° in Taurus (30 + 23.2)
const result = generatePrediction(moonDeg);
console.log('🪐 Sub-Lord:', result.subLord);
console.log('🔮 Prediction:', result.prediction);

// Export
if (typeof module !== 'undefined') {
  module.exports = { generatePrediction };
}
