//Sample records for the interface. Replace these with Supabase records later.
export const sensors = [
  { id: 'temperature', label: 'Air temperature', unit: '°C' },
  { id: 'humidity', label: 'Air humidity', unit: '%' },
  { id: 'ec', label: 'Nutrient solution EC', unit: 'mS/cm' },
  { id: 'level', label: 'Water tank level', unit: 'L' },
  { id: 'light', label: 'Light level', unit: 'lux' }
];

export const sampleReadings = [
  { recordedAt: '2026-11-02T08:00:00+05:30', temperature: 25.1, humidity: 72, ec: 1.5, level: 8.4, light: 9500 },
  { recordedAt: '2026-11-02T10:00:00+05:30', temperature: 26.2, humidity: 68, ec: 1.6, level: 8.2, light: 14300 },
  { recordedAt: '2026-11-02T12:00:00+05:30', temperature: 28.3, humidity: 61, ec: 1.6, level: 8.0, light: 21300 },
  { recordedAt: '2026-11-02T14:00:00+05:30', temperature: 27.8, humidity: 64, ec: 1.6, level: 7.8, light: 18200 },
  { recordedAt: '2026-11-03T08:00:00+05:30', temperature: 25.4, humidity: 71, ec: 1.5, level: 8.2, light: 10200 },
  { recordedAt: '2026-11-03T10:00:00+05:30', temperature: 26.5, humidity: 67, ec: 1.6, level: 8.0, light: 15100 },
  { recordedAt: '2026-11-03T12:00:00+05:30', temperature: 28.1, humidity: 60, ec: 1.6, level: 7.8, light: 22000 },
  { recordedAt: '2026-11-03T14:00:00+05:30', temperature: 27.4, humidity: 63, ec: 1.6, level: 7.5, light: 18400 }
];

export const sampleEvents = [
  { id: 'sample-light', recordedAt: '2026-11-03T14:32:00+05:30', system: 'Light sensor', status: 'warning', message: 'Sample alert: the light reading is outdated.' },
  { id: 'sample-automation', recordedAt: '2026-11-03T14:20:00+05:30', system: 'Hydroponic nutrient management', status: 'info', message: 'Sample report: automatic nutrient management status received.' },
  { id: 'sample-controller', recordedAt: '2026-11-03T08:00:00+05:30', system: 'Controller', status: 'info', message: 'Sample connection event. This is not a live device connection.' }
];
