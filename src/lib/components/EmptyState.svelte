<script lang="ts">
	let {
		title = '조건에 맞는 문제를 찾을 수 없습니다',
		description = '필터 조건(난이도, 언어)을 완화하거나 [필터 초기화]를 클릭한 후 다시 시도해 보세요.',
		onReset,
		onRetry
	}: {
		title?: string;
		description?: string;
		onReset?: () => void;
		onRetry?: () => void;
	} = $props();
</script>

<div class="glass-card rounded-3xl p-8 sm:p-12 text-center border border-[#774936]/15 max-w-2xl mx-auto my-6">
	<div class="w-16 h-16 rounded-2xl bg-[#774936]/10 border border-[#774936]/20 flex items-center justify-center mx-auto mb-5 text-[#774936]">
		<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
		</svg>
	</div>

	<h3 class="text-lg sm:text-xl font-bold text-[#774936] mb-2">{title}</h3>
	<p class="text-xs sm:text-sm text-[#774936]/70 mb-6 leading-relaxed max-w-md mx-auto">{description}</p>

	<div class="flex flex-wrap justify-center gap-3">
		{#if onReset}
			<button
				onclick={onReset}
				class="px-5 py-2.5 rounded-xl text-xs font-bold text-[#F5D0C5] bg-[#050609] hover:bg-[#774936] transition-colors cursor-pointer"
			>
				필터 초기화하기
			</button>
		{/if}

		{#if onRetry}
			<button
				onclick={onRetry}
				class="px-5 py-2.5 rounded-xl text-xs font-semibold text-[#774936] bg-[#774936]/10 border border-[#774936]/20 hover:bg-[#774936]/20 transition-colors cursor-pointer"
			>
				다시 시도
			</button>
		{/if}
	</div>
</div>
