import { describe, it, expect, vi } from 'vitest';
import { fetchRandomChallenge } from './service';
import type { ChallengeApiResponse } from '$lib/types';

describe('fetchRandomChallenge service', () => {
	it('should return challenge successfully when API returns valid data', async () => {
		const mockResponse: ChallengeApiResponse = {
			totalEntries: 2,
			totalPages: 1,
			result: [
				{
					id: 101,
					title: '두 수의 합',
					partTitle: '코딩테스트 입문',
					level: 0,
					finishedCount: 50000,
					acceptanceRate: 88,
					solved: false
				},
				{
					id: 102,
					title: '숫자 비교하기',
					partTitle: '코딩테스트 입문',
					level: 0,
					finishedCount: 45000,
					acceptanceRate: 90,
					solved: false
				}
			]
		};

		const mockFetch = vi.fn().mockResolvedValue({
			ok: true,
			json: async () => mockResponse
		} as Response);

		const result = await fetchRandomChallenge({ levels: [0], languages: ['javascript'] }, mockFetch as any);

		expect(result.success).toBe(true);
		expect(result.challenge).toBeDefined();
		expect([101, 102]).toContain(result.challenge?.id);
		expect(result.totalEntries).toBe(2);
		expect(result.totalPages).toBe(1);
	});

	it('should handle NO_MATCHING_CHALLENGES when API returns empty result', async () => {
		const mockResponse: ChallengeApiResponse = {
			totalEntries: 0,
			totalPages: 0,
			result: []
		};

		const mockFetch = vi.fn().mockResolvedValue({
			ok: true,
			json: async () => mockResponse
		} as Response);

		const result = await fetchRandomChallenge({ levels: [5], languages: ['brainfuck'] }, mockFetch as any);

		expect(result.success).toBe(false);
		expect(result.error).toBe('NO_MATCHING_CHALLENGES');
	});

	it('should handle HTTP error status from API', async () => {
		const mockFetch = vi.fn().mockResolvedValue({
			ok: false,
			status: 500
		} as Response);

		const result = await fetchRandomChallenge({ levels: [], languages: [] }, mockFetch as any);

		expect(result.success).toBe(false);
		expect(result.error).toContain('500');
	});
});
