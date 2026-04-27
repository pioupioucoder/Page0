// js/global.js — Volume global pour tout le site

const VOL_KEY = "game_volume";
const MUTE_KEY = "game_mute";

let globalVolume = parseFloat(localStorage.getItem(VOL_KEY) ?? "0.5");
let globalMuted = localStorage.getItem(MUTE_KEY) === "true";
globalVolume = Math.max(0, Math.min(1, globalVolume));

function applyGlobalVolume() {
  const effectiveVolume = globalMuted ? 0 : globalVolume;
  document.querySelectorAll('audio').forEach(audio => {
    try { audio.volume = effectiveVolume; } catch(e) {}
  });
}

function setGlobalVolume(vol) {
  globalVolume = Math.max(0, Math.min(1, vol));
  localStorage.setItem(VOL_KEY, globalVolume.toFixed(3));
  applyGlobalVolume();
}

function setGlobalMuted(mute) {
  globalMuted = mute;
  localStorage.setItem(MUTE_KEY, String(globalMuted));
  applyGlobalVolume();
}

function getGlobalVolume() { return globalVolume; }
function getGlobalMuted() { return globalMuted; }

// Intercepter les éléments audio créés dynamiquement
const originalAudio = window.Audio;
window.Audio = function(...args) {
  const audio = new originalAudio(...args);
  setTimeout(() => applyGlobalVolume(), 0);
  return audio;
};

// Appliquer immédiatement au chargement
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', applyGlobalVolume);
} else {
  applyGlobalVolume();
}