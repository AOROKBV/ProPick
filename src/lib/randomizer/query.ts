import type { FilterOptions } from '$lib/types';

export const PROGRAMMERS_BASE_URL = 'https://school.programmers.co.kr/api/v2/school/challenges/';

/**
 * Builds the external Programmers API URL with query parameters.
 * Serializes array options as repeated keys (e.g. levels[]=1&levels[]=2)
 */
export function buildProgrammersApiUrl(
	filters: FilterOptions,
	page: number = 1,
	perPage: number = 20,
	baseUrl: string = PROGRAMMERS_BASE_URL
): string {
	const params: string[] = [];

	params.push(`perPage=${perPage}`);
	params.push(`page=${page}`);

	if (filters.levels && filters.levels.length > 0) {
		// Sort levels ascending for clean URL structure
		const sortedLevels = [...filters.levels].sort((a, b) => a - b);
		for (const level of sortedLevels) {
			params.push(`levels[]=${encodeURIComponent(level)}`);
		}
	}

	if (filters.languages && filters.languages.length > 0) {
		for (const lang of filters.languages) {
			params.push(`languages[]=${encodeURIComponent(lang)}`);
		}
	}

	const queryString = params.join('&');
	return `${baseUrl}?${queryString}`;
}
