import type { ChallengeApiResponse, FilterOptions, RandomChallengeResponse } from '$lib/types';
import { buildProgrammersApiUrl } from './query';
import { selectRandomPage, selectRandomItem } from './engine';

/**
 * Fetches a random challenge matching given filters directly from Programmers API.
 * Works in both browser (CORS enabled by Programmers API) and server environments.
 */
export async function fetchRandomChallenge(
	filters: FilterOptions,
	customFetch: typeof fetch = fetch
): Promise<RandomChallengeResponse> {
	try {
		// 1. Request Page 1 to inspect totalPages & totalEntries
		const page1Url = buildProgrammersApiUrl(filters, 1, 20);
		const headers = {
			'Accept': 'application/json'
		};

		const page1Res = await customFetch(page1Url, { headers });

		if (!page1Res.ok) {
			return {
				success: false,
				error: `Programmers API error status: ${page1Res.status}`
			};
		}

		const page1Data: ChallengeApiResponse = await page1Res.json();

		if (!page1Data || !page1Data.result || page1Data.totalEntries === 0 || page1Data.totalPages === 0) {
			return {
				success: false,
				totalEntries: 0,
				totalPages: 0,
				error: 'NO_MATCHING_CHALLENGES'
			};
		}

		const totalPages = page1Data.totalPages;
		const randomPage = selectRandomPage(totalPages);

		let items = page1Data.result;

		// 2. If selected page > 1, fetch page N
		if (randomPage !== 1) {
			const pageNUrl = buildProgrammersApiUrl(filters, randomPage, 20);
			const pageNRes = await customFetch(pageNUrl, { headers });

			if (pageNRes.ok) {
				const pageNData: ChallengeApiResponse = await pageNRes.json();
				if (pageNData.result && pageNData.result.length > 0) {
					items = pageNData.result;
				}
			}
		}

		// 3. Select random challenge from result items
		const challenge = selectRandomItem(items);

		if (!challenge) {
			return {
				success: false,
				error: 'FAILED_TO_SELECT_CHALLENGE'
			};
		}

		return {
			success: true,
			challenge,
			totalEntries: page1Data.totalEntries,
			totalPages: page1Data.totalPages
		};
	} catch (err: any) {
		return {
			success: false,
			error: err.message || 'Network Error'
		};
	}
}
