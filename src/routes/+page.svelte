<script lang="ts">
	import { onMount } from 'svelte';
	import type { Challenge, FilterOptions, HistoryItem, RandomChallengeResponse } from '$lib/types';
	import { getHistory, addToHistory, clearHistory, getBookmarks, toggleBookmark } from '$lib/utils/storage';
	import Header from '$lib/components/Header.svelte';
	import FilterPanel from '$lib/components/FilterPanel.svelte';
	import RandomizerCard from '$lib/components/RandomizerCard.svelte';
	import SkeletonCard from '$lib/components/SkeletonCard.svelte';
	import EmptyState from '$lib/components/EmptyState.svelte';
	import HistoryDrawer from '$lib/components/HistoryDrawer.svelte';

	// Reactive state variables
	let filters = $state<FilterOptions>({
		levels: [],
		languages: [],
		order: undefined
	});

	let currentChallenge = $state<Challenge | null>(null);
	let totalEntries = $state<number>(0);
	let isLoading = $state<boolean>(false);
	let isRolling = $state<boolean>(false);
	let errorReason = $state<string | null>(null);

	// History & Bookmarks state
	let history = $state<HistoryItem[]>([]);
	let bookmarks = $state<number[]>([]);
	let isDrawerOpen = $state<boolean>(false);

	onMount(() => {
		history = getHistory();
		bookmarks = getBookmarks();

		// Auto roll initial challenge on load
		rollChallenge();
	});

	function handleFilterChange(updated: FilterOptions) {
		filters = updated;
	}

	function handleResetFilters() {
		filters = { levels: [], languages: [], order: undefined };
	}

	async function rollChallenge() {
		if (isLoading || isRolling) return;

		isLoading = true;
		isRolling = true;
		errorReason = null;

		try {
			// Construct query string for SvelteKit proxy server
			const params = new URLSearchParams();
			if (filters.levels) {
				filters.levels.forEach((l) => params.append('levels[]', String(l)));
			}
			if (filters.languages) {
				filters.languages.forEach((lang) => params.append('languages[]', lang));
			}
			if (filters.order) {
				params.append('order', filters.order);
			}

			const res = await fetch(`/api/random-challenge?${params.toString()}`);
			const data: RandomChallengeResponse = await res.json();

			// Simulated roulette animation delay for satisfying UX
			await new Promise((resolve) => setTimeout(resolve, 600));

			if (data.success && data.challenge) {
				currentChallenge = data.challenge;
				totalEntries = data.totalEntries || 0;
				// Add to history
				history = addToHistory(data.challenge);
			} else {
				currentChallenge = null;
				errorReason = data.error || 'NO_MATCHING_CHALLENGES';
			}
		} catch (err: any) {
			currentChallenge = null;
			errorReason = 'NETWORK_ERROR';
		} finally {
			isLoading = false;
			isRolling = false;
		}
	}

	function handleToggleBookmark(id: number) {
		bookmarks = toggleBookmark(id);
		history = getHistory(); // refresh history state
	}

	function handleSelectHistoryItem(challenge: Challenge) {
		currentChallenge = challenge;
	}

	function handleClearHistory() {
		clearHistory();
		history = [];
	}

	const isCurrentBookmarked = $derived(
		currentChallenge ? bookmarks.includes(currentChallenge.id) : false
	);
</script>

<div class="min-h-screen flex flex-col bg-[#050609]">
	<!-- Header -->
	<Header
		historyCount={history.length}
		bookmarkCount={bookmarks.length}
		onToggleHistory={() => (isDrawerOpen = true)}
	/>

	<!-- Main Content Container -->
	<main class="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-12">
		<!-- Hero Section -->
		<div class="text-center mb-10">
			<div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F5D0C5]/10 border border-[#F5D0C5]/20 text-xs font-bold text-[#F5D0C5] mb-4">
				<span class="w-2 h-2 rounded-full bg-[#D69F7E] animate-ping"></span>
				무작위 코딩 테스트 문제 추첨기
			</div>
			<h2 class="text-3xl sm:text-5xl font-black text-[#F5D0C5] tracking-tight text-glow mb-4">
				오늘 어떤 문제를 풀지 고민되시나요?
			</h2>
			<p class="text-sm sm:text-base text-[#F5D0C5]/70 max-w-xl mx-auto leading-relaxed">
				원하는 조건(난이도, 언어)을 설정하고 <strong>[랜덤 추첨]</strong>을 눌러주세요.<br class="hidden sm:inline" />
				우유부단함을 해소하고 즉시 문제 풀이에 집중하세요!
			</p>
		</div>

		<!-- Filter Panel -->
		<FilterPanel
			{filters}
			disabled={isLoading || isRolling}
			onFilterChange={handleFilterChange}
			onResetFilters={handleResetFilters}
		/>

		<!-- Big Pick Action Button -->
		<div class="mb-10 text-center">
			<button
				onclick={rollChallenge}
				disabled={isLoading || isRolling}
				class="relative group/btn inline-flex items-center justify-center gap-3 px-8 sm:px-12 py-5 rounded-2xl text-base sm:text-lg font-black text-[#050609] bg-gradient-to-r from-[#F5D0C5] via-[#D69F7E] to-[#F5D0C5] bg-[length:200%_auto] hover:bg-right transition-all duration-500 shadow-2xl shadow-[#D69F7E]/30 disabled:opacity-60 cursor-pointer overflow-hidden transform hover:-translate-y-1 active:translate-y-0"
			>
				<span class="relative z-10 flex items-center gap-2">
					{#if isLoading || isRolling}
						<svg class="w-6 h-6 animate-spin text-[#050609]" fill="none" viewBox="0 0 24 24">
							<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
							<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
						</svg>
						<span>추첨 중...</span>
					{:else}
						<svg class="w-6 h-6 transition-transform group-hover/btn:rotate-180 duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M4.5 12c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662" />
						</svg>
						<span>✨ 무작위 문제 추첨하기</span>
					{/if}
				</span>
			</button>
		</div>

		<!-- Result Display Container -->
		<section aria-label="추첨 결과">
			{#if isLoading}
				<SkeletonCard />
			{:else if currentChallenge}
				<RandomizerCard
					challenge={currentChallenge}
					{isRolling}
					isBookmarked={isCurrentBookmarked}
					{totalEntries}
					onRoll={rollChallenge}
					onToggleBookmark={handleToggleBookmark}
				/>
			{:else if errorReason}
				<EmptyState
					title={errorReason === 'NETWORK_ERROR' ? '네트워크 오류가 발생했습니다' : '조건에 맞는 문제를 찾을 수 없습니다'}
					description={errorReason === 'NETWORK_ERROR' ? '인터넷 연결 상태 또는 프록시 통신을 확인해 주세요.' : '선택한 난이도와 언어 조건에 해당하는 프로그래머스 문제가 없습니다.'}
					onReset={handleResetFilters}
					onRetry={rollChallenge}
				/>
			{:else}
				<div class="glass-card rounded-3xl p-10 text-center border border-[#F5D0C5]/10">
					<p class="text-sm text-[#F5D0C5]/60">상단의 [무작위 문제 추첨하기] 버튼을 클릭해 문제를 추첨해 보세요.</p>
				</div>
			{/if}
		</section>
	</main>

	<!-- Footer -->
	<footer class="w-full border-t border-[#F5D0C5]/10 py-6 text-center text-xs text-[#F5D0C5]/40">
		<div class="max-w-4xl mx-auto px-4">
			<p>© 2026 ProPick (프로픽) — Programmers Random Challenge Picker.</p>
			<p class="mt-1 text-[11px] text-[#F5D0C5]/30">본 서비스는 프로그래머스(Programmers)의 공개 API 데이터를 활용합니다.</p>
		</div>
	</footer>

	<!-- History Drawer -->
	<HistoryDrawer
		isOpen={isDrawerOpen}
		{history}
		{bookmarks}
		onClose={() => (isDrawerOpen = false)}
		onSelectChallenge={handleSelectHistoryItem}
		onToggleBookmark={handleToggleBookmark}
		onClearHistory={handleClearHistory}
	/>
</div>
