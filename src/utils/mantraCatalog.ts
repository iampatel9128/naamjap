/**
 * Catalog of available mantra audio files.
 * Add new mantras here — each entry needs an id, display name, and require() source.
 */

export interface MantraEntry {
  id: string;
  name: string;
  source: ReturnType<typeof require>;
}

/**
 * All available mantra audio options.
 * To add a new mantra:
 * 1. Place the .mp3 file in the assets/ directory
 * 2. Add an entry below with a unique id, display name, and require() path
 */
export const MANTRA_CATALOG: MantraEntry[] = [
  {
    id: 'krishnay-vasudewaye',
    name: 'Krishnay Vasudewaye',
    source: require('../../assets/krishnay-vasudewaye.mp3'),
  },
];

/**
 * Returns the default mantra (first in catalog).
 */
export function getDefaultMantra(): MantraEntry {
  return MANTRA_CATALOG[0];
}

/**
 * Finds a mantra by id. Returns undefined if not found.
 */
export function findMantraById(id: string): MantraEntry | undefined {
  return MANTRA_CATALOG.find((m) => m.id === id);
}
