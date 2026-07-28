import { describe, it, expect } from 'vitest';
import {
	DEFAULT_LANGUAGES,
	toggleLanguageFilter,
	ensureLanguages,
	toggleLevelFilter,
	selectLevelPreset,
	getLevelSummary,
	getLevelInfo
} from './filters';

describe('filters module', () => {
	describe('toggleLanguageFilter', () => {
		it('should add a language if not already present', () => {
			const result = toggleLanguageFilter(['cpp'], 'python3');
			expect(result).toEqual(['cpp', 'python3']);
		});

		it('should remove a language if more than one is selected', () => {
			const result = toggleLanguageFilter(['cpp', 'python3'], 'python3');
			expect(result).toEqual(['cpp']);
		});

		it('should NOT remove a language if only one is selected (maintains minimum 1 selection)', () => {
			const result = toggleLanguageFilter(['cpp'], 'cpp');
			expect(result).toEqual(['cpp']);
		});
	});

	describe('ensureLanguages', () => {
		it('should return DEFAULT_LANGUAGES (["cpp"]) if input is empty or undefined', () => {
			expect(ensureLanguages([])).toEqual(DEFAULT_LANGUAGES);
			expect(ensureLanguages(undefined)).toEqual(DEFAULT_LANGUAGES);
		});

		it('should return the original languages if not empty', () => {
			expect(ensureLanguages(['java', 'python3'])).toEqual(['java', 'python3']);
		});
	});

	describe('level filtering logic', () => {
		it('toggleLevelFilter should toggle level in array and keep it sorted', () => {
			expect(toggleLevelFilter([], 2)).toEqual([2]);
			expect(toggleLevelFilter([2], 1)).toEqual([1, 2]);
			expect(toggleLevelFilter([1, 2], 2)).toEqual([1]);
		});

		it('selectLevelPreset should return correct level ranges', () => {
			expect(selectLevelPreset('all')).toEqual([]);
			expect(selectLevelPreset('beginner')).toEqual([0, 1]);
			expect(selectLevelPreset('intermediate')).toEqual([2, 3]);
			expect(selectLevelPreset('advanced')).toEqual([4, 5]);
		});

		it('getLevelInfo should return valid metadata', () => {
			const info = getLevelInfo(2);
			expect(info.name).toBe('중급');
			expect(info.tag).toBe('대표 코테');
		});

		it('getLevelSummary should provide readable description', () => {
			const allSummary = getLevelSummary([]);
			expect(allSummary.title).toContain('전체 난이도');

			const levelSummary = getLevelSummary([1, 2]);
			expect(levelSummary.title).toBe('Lv.1, Lv.2 선택됨');
			expect(levelSummary.countText).toBe('2개 난이도 선택');
		});
	});
});
