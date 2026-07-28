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

<header class="w-full border-b border-[#280003]/15 bg-[#FEFEFA]/90 backdrop-blur-md sticky top-0 z-40">
	<div class="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
		<!-- Brand Logo & Title -->
		<div class="flex items-center gap-3">
			<div class="w-10 h-10 rounded-xl bg-[#002825] flex items-center justify-center font-bold text-lg text-[#FEFEFA]">
				P
			</div>
			<div>
				<div class="flex items-center gap-2">
					<h1 class="text-xl sm:text-2xl font-extrabold tracking-tight text-[#280003]">
						ProPick
					</h1>
					<span class="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#280003]/10 text-[#280003] border border-[#280003]/20">
						v1.0
					</span>
				</div>
				<p class="text-xs text-[#280003]/70 hidden sm:block">
					프로그래머스 맞춤형 랜덤 문제 추첨 서비스
				</p>
			</div>
		</div>

		<!-- Action Controls -->
		<div class="flex items-center gap-3">
			<button
				onclick={onToggleHistory}
				class="group relative inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-[#280003] bg-[#FEFEFA] border border-[#280003]/20 hover:bg-[#002825]/10 hover:border-[#002825]/30 transition-all duration-200 cursor-pointer"
				title="추첨 기록 및 즐겨찾기"
			>
				<svg class="w-4 h-4 text-[#280003] group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
				</svg>
				<span class="hidden sm:inline">기록 / 즐겨찾기</span>
				{#if historyCount > 0 || bookmarkCount > 0}
					<span class="inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-[#002825] text-[#FEFEFA]">
						{bookmarkCount > 0 ? `★ ${bookmarkCount}` : historyCount}
					</span>
				{/if}
			</button>
		</div>
	</div>
</header>
