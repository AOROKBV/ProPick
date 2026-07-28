import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import type { ChallengeApiResponse, FilterOptions, RandomChallengeResponse } from '$lib/types';
import { buildProgrammersApiUrl } from '$lib/randomizer/query';
import { selectRandomPage, selectRandomItem } from '$lib/randomizer/engine';

export const GET: RequestHandler = async ({ url, fetch }) => {
	try {
		// Extract filters from incoming URL parameters
		const levelsParam = url.searchParams.getAll('levels[]').map(Number).filter((n) => !isNaN(n));
		const languagesParam = url.searchParams.getAll('languages[]').filter(Boolean);
		const orderParam = (url.searchParams.get('order') as FilterOptions['order']) || undefined;

		const filters: FilterOptions = {
			levels: levelsParam,
			languages: languagesParam,
			order: orderParam
		};

		// 1. Request Page 1 to inspect totalPages & totalEntries
		const page1Url = buildProgrammersApiUrl(filters, 1, 20);
		const headers = {
			'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
			'Accept': 'application/json'
		};

		const page1Res = await fetch(page1Url, { headers });

		if (!page1Res.ok) {
			return json(
				{
					success: false,
					error: `Programmers API error status: ${page1Res.status}`
				} satisfies RandomChallengeResponse,
				{ status: 502 }
			);
		}

		const page1Data: ChallengeApiResponse = await page1Res.json();

		if (!page1Data || !page1Data.result || page1Data.totalEntries === 0 || page1Data.totalPages === 0) {
			return json({
				success: false,
				totalEntries: 0,
				totalPages: 0,
				error: 'NO_MATCHING_CHALLENGES'
			} satisfies RandomChallengeResponse);
		}

		const totalPages = page1Data.totalPages;
		const randomPage = selectRandomPage(totalPages);

		let items = page1Data.result;

		// 2. If selected page > 1, fetch page N
		if (randomPage !== 1) {
			const pageNUrl = buildProgrammersApiUrl(filters, randomPage, 20);
			const pageNRes = await fetch(pageNUrl, { headers });

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
			return json({
				success: false,
				error: 'FAILED_TO_SELECT_CHALLENGE'
			} satisfies RandomChallengeResponse);
		}

		return json({
			success: true,
			challenge,
			totalEntries: page1Data.totalEntries,
			totalPages: page1Data.totalPages
		} satisfies RandomChallengeResponse);
	} catch (err: any) {
		return json(
			{
				success: false,
				error: err.message || 'Internal Server Error'
			} satisfies RandomChallengeResponse,
			{ status: 500 }
		);
	}
};
