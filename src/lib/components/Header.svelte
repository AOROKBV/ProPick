<script lang="ts">
	let {
		historyCount = 0,
		bookmarkCount = 0,
		onToggleHistory
	}: {
		historyCount?: number;
		bookmarkCount?: number;
		onToggleHistory: () => void;
	} = $props();
</script>

<header class="w-full border-b border-[#F5D0C5]/10 bg-[#050609]/80 backdrop-blur-md sticky top-0 z-40">
	<div class="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
		<!-- Brand Logo & Title -->
		<div class="flex items-center gap-3">
			<div class="w-10 h-10 rounded-xl bg-gradient-to-br from-[#F5D0C5] via-[#D69F7E] to-[#774936] p-0.5 shadow-lg shadow-[#D69F7E]/20">
				<div class="w-full h-full bg-[#050609] rounded-[10px] flex items-center justify-center font-bold text-lg text-[#F5D0C5]">
					P
				</div>
			</div>
			<div>
				<div class="flex items-center gap-2">
					<h1 class="text-xl sm:text-2xl font-extrabold tracking-tight text-glow text-[#F5D0C5]">
						ProPick
					</h1>
					<span class="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#774936]/30 text-[#D69F7E] border border-[#774936]/40">
						v1.0
					</span>
				</div>
				<p class="text-xs text-[#F5D0C5]/60 hidden sm:block">
					프로그래머스 맞춤형 랜덤 문제 추첨 서비스
				</p>
			</div>
		</div>

		<!-- Action Controls -->
		<div class="flex items-center gap-3">
			<button
				onclick={onToggleHistory}
				class="group relative inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-[#F5D0C5] bg-[#F5D0C5]/5 border border-[#F5D0C5]/15 hover:bg-[#D69F7E]/15 hover:border-[#D69F7E]/40 transition-all duration-200 cursor-pointer"
				title="추첨 기록 및 즐겨찾기"
			>
				<svg class="w-4 h-4 text-[#D69F7E] group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
				</svg>
				<span class="hidden sm:inline">기록 / 즐겨찾기</span>
				{#if historyCount > 0 || bookmarkCount > 0}
					<span class="inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-[#D69F7E] text-[#050609]">
						{bookmarkCount > 0 ? `★ ${bookmarkCount}` : historyCount}
					</span>
				{/if}
			</button>
		</div>
	</div>
</header>
