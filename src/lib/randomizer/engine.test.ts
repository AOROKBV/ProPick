import { describe, it, expect } from 'vitest';
import { selectRandomPage, selectRandomItem } from './engine';

describe('selectRandomPage', () => {
	it('should return 1 if totalPages is 0 or negative', () => {
		expect(selectRandomPage(0)).toBe(1);
		expect(selectRandomPage(-5)).toBe(1);
	});

	it('should select page 1 when random value is 0.0', () => {
		const page = selectRandomPage(10, () => 0.0);
		expect(page).toBe(1);
	});

	it('should select page N when random value is close to 1.0', () => {
		const page = selectRandomPage(10, () => 0.9999);
		expect(page).toBe(10);
	});

	it('should correctly map middle random values', () => {
		const page = selectRandomPage(10, () => 0.45);
		expect(page).toBe(5);
	});
});

describe('selectRandomItem', () => {
	it('should return null for empty or invalid array', () => {
		expect(selectRandomItem([])).toBeNull();
	});

	it('should pick first item when random is 0', () => {
		const items = ['apple', 'banana', 'cherry'];
		expect(selectRandomItem(items, () => 0)).toBe('apple');
	});

	it('should pick last item when random is close to 1', () => {
		const items = ['apple', 'banana', 'cherry'];
		expect(selectRandomItem(items, () => 0.999)).toBe('cherry');
	});
});
