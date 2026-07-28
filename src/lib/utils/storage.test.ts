import { describe, it, expect, beforeEach } from 'vitest';
import { getHistory, addToHistory, clearHistory, getBookmarks, toggleBookmark } from './storage';
import type { Challenge } from '$lib/types';

const sampleChallenge: Challenge = {
	id: 12906,
	title: '같은 숫자는 싫어',
	partTitle: '스택/큐',
	level: 1,
	finishedCount: 85200,
	acceptanceRate: 72.5,
	status: 'opened',
	openedAt: '2022-01-01'
};

describe('Storage utilities', () => {
	beforeEach(() => {
		clearHistory();
		// reset bookmarks
		const bookmarks = getBookmarks();
		for (const id of bookmarks) {
			toggleBookmark(id);
		}
	});

	it('should add and retrieve items from history', () => {
		addToHistory(sampleChallenge);
		const history = getHistory();
		expect(history.length).toBe(1);
		expect(history[0].challenge.id).toBe(12906);
	});

	it('should toggle bookmarks correctly', () => {
		toggleBookmark(12906);
		expect(getBookmarks()).toContain(12906);

		toggleBookmark(12906);
		expect(getBookmarks()).not.toContain(12906);
	});

	it('should clear history when clearHistory is called', () => {
		addToHistory(sampleChallenge);
		clearHistory();
		expect(getHistory()).toEqual([]);
	});
});
