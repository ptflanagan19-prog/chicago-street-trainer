// Safe LocalStorage wrapper. Falls back to an in-memory store if LocalStorage
// is unavailable (private mode, disabled, quota errors) so the game never crashes.

const STORAGE_KEY = "chicago-street-trainer:v1";

let memoryFallback = {};
let warned = false;

function storageAvailable() {
  try {
    const testKey = "__cst_test__";
    window.localStorage.setItem(testKey, "1");
    window.localStorage.removeItem(testKey);
    return true;
  } catch {
    if (!warned) {
      console.warn(
        "LocalStorage unavailable — progress will not persist this session."
      );
      warned = true;
    }
    return false;
  }
}

export function loadState() {
  try {
    if (storageAvailable()) {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    }
    return memoryFallback[STORAGE_KEY] || null;
  } catch (err) {
    console.warn("Failed to read saved progress:", err);
    return null;
  }
}

export function saveState(state) {
  try {
    const serialized = JSON.stringify(state);
    if (storageAvailable()) {
      window.localStorage.setItem(STORAGE_KEY, serialized);
    } else {
      memoryFallback[STORAGE_KEY] = JSON.parse(serialized);
    }
    return true;
  } catch (err) {
    console.warn("Failed to save progress:", err);
    return false;
  }
}

export function clearState() {
  try {
    if (storageAvailable()) {
      window.localStorage.removeItem(STORAGE_KEY);
    }
    memoryFallback = {};
    return true;
  } catch (err) {
    console.warn("Failed to clear progress:", err);
    return false;
  }
}

export function isStorageAvailable() {
  return storageAvailable();
}
