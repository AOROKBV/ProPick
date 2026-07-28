<script lang="ts">
	import type { Challenge, HistoryItem } from '$lib/types';
	import LevelBadge from './LevelBadge.svelte';

	let {
		isOpen = false,
		history = [],
		bookmarks = [],
		onClose,
		onSelectChallenge,
		onToggleBookmark,
		onClearHistory
	}: {
		isOpen: boolean;
		history: HistoryItem[];
		bookmarks: number[];
		onClose: () => void;
		onSelectChallenge: (challenge: Challenge) => void;
		onToggleBookmark: (id: number) => void;
		onClearHistory: () => void;
	} = $props();

	let activeTab = $state<'history' | 'bookmarks'>('history');

	const bookmarkedHistoryItems = $derived(
		history.filter((item) => bookmarks.includes(item.challenge.id))
	);

	function formatTimeAgo(timestamp: number): string {
		const seconds = Math.floor((Date.now() - timestamp) / 1000);
		if (seconds < 60) return '방금 전';
		const minutes = Math.floor(seconds / 60);
		if (minutes < 60) return `${minutes}분 전`;
		const hours = Math.floor(minutes / 60);
		if (hours < 24) return `${hours}시간 전`;
		const days = Math.floor(hours / 24);
		return `${days}일 전`;
	}
</script>

{#if isOpen}
	<!-- Backdrop overlay -->
	<button
		type="button"
		aria-label="모달 닫기"
		onclick={onClose}
		class="fixed inset-0 w-full h-full bg-[#050609]/40 backdrop-blur-sm z-50 transition-opacity border-none cursor-default"
	></button>

	<!-- Drawer panel -->
	<aside
		class="fixed top-0 right-0 bottom-0 w-full max-w-md bg-[#FAF0EC] border-l border-[#774936]/20 z-50 p-6 flex flex-col shadow-2xl transition-transform duration-300"
	>
		<!-- Header -->
		<div class="flex items-center justify-between pb-4 mb-4 border-b border-[#774936]/15">
			<div class="flex items-center gap-2">
				<h2 class="text-lg font-bold text-[#774936]">추첨 기록 & 즐겨찾기</h2>
			</div>

			<button
				type="button"
				aria-label="닫기"
				onclick={onClose}
				class="p-2 rounded-xl text-[#774936]/60 hover:text-[#774936] hover:bg-[#774936]/10 transition-colors cursor-pointer"
			>
				<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
				</svg>
			</button>
		</div>

		<!-- Tab Switcher -->
		<div class="flex gap-2 p-1 rounded-xl bg-[#FFF4E0] border border-[#774936]/15 mb-4">
			<button
				onclick={() => (activeTab = 'history')}
				class="flex-1 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer {activeTab === 'history'
					? 'bg-[#050609] text-[#FFF4E0] shadow-sm'
					: 'text-[#774936]/70 hover:text-[#774936]'}"
			>
				히스토리 ({history.length})
			</button>
			<button
				onclick={() => (activeTab = 'bookmarks')}
				class="flex-1 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer {activeTab === 'bookmarks'
					? 'bg-[#050609] text-[#FFF4E0] shadow-sm'
					: 'text-[#774936]/70 hover:text-[#774936]'}"
			>
				★ 즐겨찾기 ({bookmarkedHistoryItems.length})
			</button>
		</div>

		<!-- List Content -->
		<div class="flex-1 overflow-y-auto space-y-3 pr-1">
			{#if activeTab === 'history'}
				{#if history.length === 0}
					<div class="text-center py-16 text-[#774936]/50 text-xs">
						아직 추첨된 문제 기록이 없습니다.
					</div>
				{:else}
					{#each history as item}
						<div
							class="group p-4 rounded-2xl bg-[#FFFFFF] border border-[#774936]/15 hover:border-[#774936]/40 transition-all flex items-center justify-between gap-3 shadow-xs"
						>
							<button
								onclick={() => {
									onSelectChallenge(item.challenge);
									onClose();
								}}
								class="flex-1 text-left cursor-pointer"
							>
								<div class="flex items-center gap-2 mb-1.5">
									<LevelBadge level={item.challenge.level} size="sm" />
									<span class="text-[10px] text-[#774936]/50 font-mono">
										{formatTimeAgo(item.timestamp)}
									</span>
								</div>
								<h4 class="text-sm font-bold text-[#774936] group-hover:text-[#050609] transition-colors line-clamp-1">
									{item.challenge.title}
								</h4>
							</button>

							<button
								onclick={() => onToggleBookmark(item.challenge.id)}
								class="p-2 text-[#774936]/40 hover:text-amber-600 cursor-pointer"
								title="북마크 토글"
							>
								<svg
									class="w-4 h-4 {bookmarks.includes(item.challenge.id) ? 'text-amber-600 fill-amber-600' : ''}"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
									/>
								</svg>
							</button>
						</div>
					{/each}
				{/if}
			{:else}
				{#if bookmarkedHistoryItems.length === 0}
					<div class="text-center py-16 text-[#774936]/50 text-xs">
						즐겨찾기한 문제가 없습니다.<br />추첨된 문제 카드에서 ★ 버튼을 눌러 추가해 보세요.
					</div>
				{:else}
					{#each bookmarkedHistoryItems as item}
						<div
							class="group p-4 rounded-2xl bg-[#FFFFFF] border border-[#774936]/15 hover:border-[#774936]/40 transition-all flex items-center justify-between gap-3 shadow-xs"
						>
							<button
								onclick={() => {
									onSelectChallenge(item.challenge);
									onClose();
								}}
								class="flex-1 text-left cursor-pointer"
							>
								<div class="flex items-center gap-2 mb-1.5">
									<LevelBadge level={item.challenge.level} size="sm" />
								</div>
								<h4 class="text-sm font-bold text-[#774936] group-hover:text-[#050609] transition-colors line-clamp-1">
									{item.challenge.title}
								</h4>
							</button>

							<button
								onclick={() => onToggleBookmark(item.challenge.id)}
								class="p-2 text-amber-600 hover:opacity-75 cursor-pointer"
								title="즐겨찾기 해제"
							>
								<svg class="w-4 h-4 fill-amber-600" viewBox="0 0 24 24">
									<path
										d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
									/>
								</svg>
							</button>
						</div>
					{/each}
				{/if}
			{/if}
		</div>

		<!-- Drawer Footer -->
		{#if activeTab === 'history' && history.length > 0}
			<div class="pt-4 border-t border-[#774936]/15 mt-auto">
				<button
					onclick={onClearHistory}
					class="w-full py-2.5 rounded-xl text-xs font-semibold text-rose-700 bg-rose-500/10 hover:bg-rose-500/20 transition-colors cursor-pointer"
				>
					기록 전체 삭제
				</button>
			</div>
		{/if}
	</aside>
{/if}
