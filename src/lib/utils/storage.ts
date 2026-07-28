import type { Challenge, HistoryItem } from '$lib/types';

const HISTORY_KEY = 'propick_challenge_history';
const BOOKMARKS_KEY = 'propick_challenge_bookmarks';
const MAX_HISTORY = 30;

// In-memory fallback for SSR or node environments without window.localStorage
class MemoryStorage implements Storage {
	private store: Record<string, string> = {};

	get length(): number {
		return Object.keys(this.store).length;
	}

	clear(): void {
		this.store = {};
	}

	getItem(key: string): string | null {
		return this.store[key] ?? null;
	}

	key(index: number): string | null {
		const keys = Object.keys(this.store);
		return keys[index] ?? null;
	}

	removeItem(key: string): void {
		delete this.store[key];
	}

	setItem(key: string, value: string): void {
		this.store[key] = value;
	}

	[name: string]: any;
}

const memoryStorageFallback = new MemoryStorage();

function getStorage(): Storage {
	if (typeof window !== 'undefined' && window.localStorage) {
		return window.localStorage;
	}
	if (typeof globalThis !== 'undefined' && (globalThis as any).localStorage) {
		return (globalThis as any).localStorage;
	}
	return memoryStorageFallback;
}

/**
 * Reads local storage history.
 */
export function getHistory(): HistoryItem[] {
	try {
		const storage = getStorage();
		const raw = storage.getItem(HISTORY_KEY);
		return raw ? JSON.parse(raw) : [];
	} catch {
		return [];
	}
}

/**
 * Adds a challenge to history (prevents immediate duplicates, caps at MAX_HISTORY).
 */
export function addToHistory(challenge: Challenge): HistoryItem[] {
	try {
		const storage = getStorage();
		const current = getHistory();
		// Remove existing entry for same challenge if any
		const filtered = current.filter((item) => item.challenge.id !== challenge.id);

		const bookmarks = getBookmarks();
		const isBookmarked = bookmarks.includes(challenge.id);

		const newItem: HistoryItem = {
			challenge,
			timestamp: Date.now(),
			isBookmarked
		};

		const updated = [newItem, ...filtered].slice(0, MAX_HISTORY);
		storage.setItem(HISTORY_KEY, JSON.stringify(updated));
		return updated;
	} catch {
		return [];
	}
}

/**
 * Clears history.
 */
export function clearHistory(): void {
	try {
		const storage = getStorage();
		storage.removeItem(HISTORY_KEY);
	} catch {
		// Ignore storage errors
	}
}

/**
 * Gets array of bookmarked challenge IDs.
 */
export function getBookmarks(): number[] {
	try {
		const storage = getStorage();
		const raw = storage.getItem(BOOKMARKS_KEY);
		return raw ? JSON.parse(raw) : [];
	} catch {
		return [];
	}
}

/**
 * Toggles bookmark status for a challenge ID.
 */
export function toggleBookmark(challengeId: number): number[] {
	try {
		const storage = getStorage();
		const bookmarks = getBookmarks();
		let updated: number[];
		if (bookmarks.includes(challengeId)) {
			updated = bookmarks.filter((id) => id !== challengeId);
		} else {
			updated = [...bookmarks, challengeId];
		}
		storage.setItem(BOOKMARKS_KEY, JSON.stringify(updated));

		// Update bookmark flag in history as well
		const history = getHistory();
		if (history.length > 0) {
			const updatedHistory = history.map((item) => {
				if (item.challenge.id === challengeId) {
					return { ...item, isBookmarked: updated.includes(challengeId) };
				}
				return item;
			});
			storage.setItem(HISTORY_KEY, JSON.stringify(updatedHistory));
		}

		return updated;
	} catch {
		return [];
	}
}
