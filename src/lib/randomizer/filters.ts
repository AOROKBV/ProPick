export const DEFAULT_LANGUAGES = ['cpp'];

export interface LevelInfo {
	level: number;
	name: string;
	tag: string;
	description: string;
	bgClass: string;
	textClass: string;
	borderClass: string;
	activeRing: string;
}

export const LEVEL_METADATA: Record<number, LevelInfo> = {
	0: {
		level: 0,
		name: '입문',
		tag: '기초 문법',
		description: '프로그래밍 기초 문법과 단순 연산 문제 (코테 첫걸음)',
		bgClass: 'bg-emerald-500/15',
		textClass: 'text-emerald-700 dark:text-emerald-300',
		borderClass: 'border-emerald-500/30',
		activeRing: 'ring-emerald-500/50'
	},
	1: {
		level: 1,
		name: '기초',
		tag: '코테 입문',
		description: '기초 조건문, 반복문, 기본 자료구조 활용 (입문자 추천)',
		bgClass: 'bg-sky-500/15',
		textClass: 'text-sky-700 dark:text-sky-300',
		borderClass: 'border-sky-500/30',
		activeRing: 'ring-sky-500/50'
	},
	2: {
		level: 2,
		name: '중급',
		tag: '대표 코테',
		description: '스택/큐, DFS/BFS, 완탐, 정렬 등 대기업 코딩테스트 대표 난이도',
		bgClass: 'bg-amber-500/15',
		textClass: 'text-amber-800 dark:text-amber-300',
		borderClass: 'border-amber-500/30',
		activeRing: 'ring-amber-500/50'
	},
	3: {
		level: 3,
		name: '상급',
		tag: '실전 합격선',
		description: 'DP, 이분탐색, 최단거리, 그래프 등 코테 합격을 좌우하는 상급 문제',
		bgClass: 'bg-orange-500/15',
		textClass: 'text-orange-800 dark:text-orange-300',
		borderClass: 'border-orange-500/30',
		activeRing: 'ring-orange-500/50'
	},
	4: {
		level: 4,
		name: '고난도',
		tag: '심화 최적화',
		description: '복합 알고리즘 및 엄격한 시간/공간 복잡도 최적화가 필요한 문제',
		bgClass: 'bg-rose-500/15',
		textClass: 'text-rose-800 dark:text-rose-300',
		borderClass: 'border-rose-500/30',
		activeRing: 'ring-rose-500/50'
	},
	5: {
		level: 5,
		name: '마스터',
		tag: '극상위 도전',
		description: '알고리즘 경진대회급 극상위 난이도의 고난도 챌린지 문제',
		bgClass: 'bg-purple-500/15',
		textClass: 'text-purple-800 dark:text-purple-300',
		borderClass: 'border-purple-500/30',
		activeRing: 'ring-purple-500/50'
	}
};

/**
 * Gets level metadata, with fallback for unknown levels.
 */
export function getLevelInfo(level: number): LevelInfo {
	return (
		LEVEL_METADATA[level] || {
			level,
			name: `Lv.${level}`,
			tag: '일반',
			description: `Level ${level} 문제`,
			bgClass: 'bg-stone-500/15',
			textClass: 'text-stone-700 dark:text-stone-300',
			borderClass: 'border-stone-500/30',
			activeRing: 'ring-stone-500/50'
		}
	);
}

/**
 * Toggles a level in the levels array.
 * If already selected, removes it. If not, adds it and returns a sorted array.
 */
export function toggleLevelFilter(currentLevels: number[] = [], level: number): number[] {
	if (currentLevels.includes(level)) {
		return currentLevels.filter((l) => l !== level);
	}
	return [...currentLevels, level].sort((a, b) => a - b);
}

export type LevelPreset = 'all' | 'beginner' | 'intermediate' | 'advanced';

/**
 * Selects levels based on preset ranges.
 */
export function selectLevelPreset(preset: LevelPreset): number[] {
	switch (preset) {
		case 'beginner':
			return [0, 1];
		case 'intermediate':
			return [2, 3];
		case 'advanced':
			return [4, 5];
		case 'all':
		default:
			return [];
	}
}

/**
 * Generates human-readable visual summary for the selected levels.
 */
export function getLevelSummary(selectedLevels: number[] = []): {
	title: string;
	description: string;
	countText: string;
} {
	if (!selectedLevels || selectedLevels.length === 0 || selectedLevels.length === 6) {
		return {
			title: '전체 난이도 (Lv.0 ~ Lv.5)',
			description: '입문부터 마스터 난이도까지 모든 프로그래머스 문제 중에서 무작위로 추첨합니다.',
			countText: '모든 난이도 포함'
		};
	}

	const sorted = [...selectedLevels].sort((a, b) => a - b);
	const names = sorted.map((l) => `Lv.${l} ${getLevelInfo(l).name}`).join(', ');

	let description = '';
	if (sorted.every((l) => l <= 1)) {
		description = '코딩테스트 입문자 및 기초 프로그래밍 연습에 적합한 난이도입니다.';
	} else if (sorted.every((l) => l >= 2 && l <= 3)) {
		description = '주요 기업 코딩테스트 서류/1차 합격을 위한 핵심 실전 알고리즘 난이도입니다.';
	} else if (sorted.every((l) => l >= 4)) {
		description = '고난도 최적화 및 경진대회 수준의 최고난도 도전 문제 영역입니다.';
	} else {
		description = `선택한 난이도 (${names}) 범위 내에서 조합하여 추첨합니다.`;
	}

	return {
		title: `${sorted.map((l) => `Lv.${l}`).join(', ')} 선택됨`,
		description,
		countText: `${sorted.length}개 난이도 선택`
	};
}

/**
 * Toggles a language in the selected languages list.
 * Guarantees that at least one language remains selected (prevents deselecting the last language).
 */
export function toggleLanguageFilter(current: string[], langId: string): string[] {
	if (current.includes(langId)) {
		if (current.length <= 1) {
			// Cannot remove the last remaining language
			return current;
		}
		return current.filter((l) => l !== langId);
	}
	return [...current, langId];
}

/**
 * Ensures that the languages array contains at least one default language.
 */
export function ensureLanguages(languages?: string[]): string[] {
	if (!languages || languages.length === 0) {
		return DEFAULT_LANGUAGES;
	}
	return languages;
}
