<script lang="ts">
	import type { Challenge } from '$lib/types';
	import LevelBadge from './LevelBadge.svelte';

	let {
		challenge,
		isRolling = false,
		isBookmarked = false,
		totalEntries = 0,
		onRoll,
		onToggleBookmark
	}: {
		challenge: Challenge | null;
		isRolling?: boolean;
		isBookmarked?: boolean;
		totalEntries?: number;
		onRoll: () => void;
		onToggleBookmark: (id: number) => void;
	} = $props();

	let copied = $state(false);

	const programmersUrl = $derived(
		challenge ? `https://school.programmers.co.kr/learn/courses/30/lessons/${challenge.id}` : '#'
	);

	function copyLink() {
		if (!challenge) return;
		navigator.clipboard.writeText(programmersUrl);
		copied = true;
		setTimeout(() => (copied = false), 2000);
	}
</script>

{#if challenge}
	<div class="relative group">
		<!-- Glowing outer ring -->
		<div class="absolute -inset-1 bg-gradient-to-r from-[#F5D0C5]/30 via-[#D69F7E]/30 to-[#774936]/30 rounded-3xl blur-xl opacity-50 group-hover:opacity-100 transition duration-500"></div>

		<div class="relative glass-card rounded-3xl p-6 sm:p-10 border border-[#F5D0C5]/20 shadow-2xl transition-all duration-300 {isRolling ? 'animate-slot-spin' : ''}">
			<!-- Card Top Header -->
			<div class="flex items-center justify-between gap-4 mb-6">
				<div class="flex items-center gap-3">
					<LevelBadge level={challenge.level} size="lg" />
					{#if challenge.partTitle}
						<span class="text-xs font-semibold text-[#D69F7E] bg-[#D69F7E]/10 px-3 py-1 rounded-full border border-[#D69F7E]/20">
							{challenge.partTitle}
						</span>
					{/if}
				</div>

				<!-- Bookmark Toggle Button -->
				<button
					onclick={() => onToggleBookmark(challenge!.id)}
					class="p-2.5 rounded-full bg-[#F5D0C5]/5 border border-[#F5D0C5]/15 text-[#F5D0C5] hover:bg-[#D69F7E]/20 transition-all cursor-pointer group/bm"
					title={isBookmarked ? '즐겨찾기 해제' : '즐겨찾기 추가'}
				>
					<svg
						class="w-5 h-5 transition-transform group-hover/bm:scale-110 {isBookmarked ? 'text-amber-400 fill-amber-400' : 'text-[#F5D0C5]/50'}"
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

			<!-- Challenge Title & ID -->
			<div class="mb-8">
				<div class="text-xs font-mono text-[#D69F7E]/70 mb-1">
					Problem #{challenge.id}
				</div>
				<h2 class="text-2xl sm:text-3xl font-extrabold text-[#F5D0C5] leading-tight tracking-tight text-glow">
					{challenge.title}
				</h2>
			</div>

			<!-- Challenge Metrics -->
			<div class="grid grid-cols-2 gap-4 py-5 px-6 rounded-2xl bg-[#050609]/60 border border-[#F5D0C5]/10 mb-8">
				<div>
					<div class="text-[11px] font-semibold text-[#F5D0C5]/50 uppercase tracking-wider mb-1">
						정답률 (Acceptance Rate)
					</div>
					<div class="text-xl sm:text-2xl font-bold font-mono text-[#D69F7E]">
						{challenge.acceptanceRate != null ? `${challenge.acceptanceRate}%` : '-'}
					</div>
				</div>
				<div>
					<div class="text-[11px] font-semibold text-[#F5D0C5]/50 uppercase tracking-wider mb-1">
						완료한 사람 (Solved)
					</div>
					<div class="text-xl sm:text-2xl font-bold font-mono text-[#F5D0C5]">
						{challenge.finishedCount != null ? challenge.finishedCount.toLocaleString() : '-'}명
					</div>
				</div>
			</div>

			<!-- Total entries stat counter -->
			{#if totalEntries > 0}
				<div class="text-xs text-center text-[#F5D0C5]/40 mb-6">
					총 <span class="font-bold text-[#D69F7E]">{totalEntries.toLocaleString()}</span>개 검색 문제 중 추첨됨
				</div>
			{/if}

			<!-- Action Buttons -->
			<div class="flex flex-col sm:flex-row gap-3">
				<!-- Solve on Programmers Button -->
				<a
					href={programmersUrl}
					target="_blank"
					rel="noopener noreferrer"
					class="flex-1 inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl text-sm font-bold text-[#050609] bg-gradient-to-r from-[#F5D0C5] via-[#D69F7E] to-[#D69F7E] hover:brightness-110 transition-all duration-200 shadow-xl shadow-[#D69F7E]/20 cursor-pointer group/link"
				>
					<span>프로그래머스에서 문제 풀기</span>
					<svg class="w-4 h-4 transition-transform group-hover/link:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
					</svg>
				</a>

				<!-- Reshuffle Button -->
				<button
					onclick={onRoll}
					disabled={isRolling}
					class="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl text-sm font-bold text-[#F5D0C5] bg-[#F5D0C5]/10 border border-[#F5D0C5]/20 hover:bg-[#F5D0C5]/20 disabled:opacity-50 transition-all cursor-pointer"
				>
					<svg class="w-4 h-4 text-[#D69F7E] {isRolling ? 'animate-spin' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
					</svg>
					<span>다시 뽑기 (Reshuffle)</span>
				</button>

				<!-- Copy Link Button -->
				<button
					onclick={copyLink}
					class="p-4 rounded-2xl bg-[#F5D0C5]/5 border border-[#F5D0C5]/10 text-[#F5D0C5] hover:bg-[#F5D0C5]/15 transition-all cursor-pointer"
					title="문제 링크 복사"
				>
					{#if copied}
						<svg class="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
						</svg>
					{:else}
						<svg class="w-5 h-5 text-[#D69F7E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
						</svg>
					{/if}
				</button>
			</div>
		</div>
	</div>
{/if}
