export interface Challenge {
	id: number;
	title: string;
	partTitle: string;
	level: number;
	finishedCount: number;
	acceptanceRate: number;
	status: string;
	openedAt: string;
	bookmarked?: boolean;
}

export interface ChallengeApiResponse {
	page: number;
	perPage: number;
	totalPages: number;
	totalEntries: number;
	languages: string[];
	result: Challenge[];
}

export interface FilterOptions {
	levels: number[];
	languages: string[];
	order?: 'recent' | 'acceptance_desc' | 'acceptance_asc';
}

export interface RandomChallengeResponse {
	success: boolean;
	challenge?: Challenge;
	totalEntries?: number;
	totalPages?: number;
	error?: string;
}

export interface HistoryItem {
	challenge: Challenge;
	timestamp: number;
	isBookmarked?: boolean;
}
