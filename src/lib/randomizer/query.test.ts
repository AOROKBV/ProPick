import { describe, it, expect } from 'vitest';
import { buildProgrammersApiUrl, PROGRAMMERS_BASE_URL } from './query';

describe('buildProgrammersApiUrl', () => {
	it('should build default URL with page and perPage when filters are empty', () => {
		const url = buildProgrammersApiUrl({ levels: [], languages: [] });
		expect(url).toBe(`${PROGRAMMERS_BASE_URL}?perPage=20&page=1`);
	});

	it('should include sorted levels[] parameters when levels are provided', () => {
		const url = buildProgrammersApiUrl({ levels: [3, 1, 0], languages: [] });
		expect(url).toBe(`${PROGRAMMERS_BASE_URL}?perPage=20&page=1&levels[]=0&levels[]=1&levels[]=3`);
	});

	it('should include languages[] parameters when languages are provided', () => {
		const url = buildProgrammersApiUrl({ levels: [], languages: ['python3', 'java'] });
		expect(url).toBe(`${PROGRAMMERS_BASE_URL}?perPage=20&page=1&languages[]=python3&languages[]=java`);
	});

	it('should include order parameter when order is specified', () => {
		const url = buildProgrammersApiUrl({ levels: [2], languages: ['javascript'], order: 'acceptance_desc' });
		expect(url).toBe(
			`${PROGRAMMERS_BASE_URL}?perPage=20&page=1&order=acceptance_desc&levels[]=2&languages[]=javascript`
		);
	});

	it('should support custom page and perPage', () => {
		const url = buildProgrammersApiUrl({ levels: [1], languages: [] }, 5, 50);
		expect(url).toBe(`${PROGRAMMERS_BASE_URL}?perPage=50&page=5&levels[]=1`);
	});
});
