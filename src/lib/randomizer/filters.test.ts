import { describe, it, expect } from 'vitest';
import { DEFAULT_LANGUAGES, toggleLanguageFilter, ensureLanguages } from './filters';

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
});
