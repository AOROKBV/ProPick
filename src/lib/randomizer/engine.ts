/**
 * Selects a random page number between 1 and totalPages (inclusive).
 * Accepts an optional randomFn for deterministic testing.
 */
export function selectRandomPage(
	totalPages: number,
	randomFn: () => number = Math.random
): number {
	if (totalPages <= 0) return 1;
	const randomVal = randomFn();
	// Math.floor(randomVal * totalPages) yields [0, totalPages - 1]
	// Clamped to guarantee valid range 1..totalPages
	const page = Math.floor(randomVal * totalPages) + 1;
	return Math.min(Math.max(1, page), totalPages);
}

/**
 * Selects a random item from an array.
 * Accepts an optional randomFn for deterministic testing.
 */
export function selectRandomItem<T>(
	items: T[],
	randomFn: () => number = Math.random
): T | null {
	if (!items || items.length === 0) return null;
	const index = Math.floor(randomFn() * items.length);
	const clampedIndex = Math.min(Math.max(0, index), items.length - 1);
	return items[clampedIndex];
}
