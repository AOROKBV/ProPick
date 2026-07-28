<script lang="ts">
	import type { FilterOptions } from '$lib/types';
	import LevelBadge from './LevelBadge.svelte';

	let {
		filters,
		onFilterChange,
		onResetFilters,
		disabled = false
	}: {
		filters: FilterOptions;
		onFilterChange: (updated: FilterOptions) => void;
		onResetFilters: () => void;
		disabled?: boolean;
	} = $props();

	const ALL_LEVELS = [0, 1, 2, 3, 4, 5];
	const ALL_LANGUAGES = [
		{ id: 'python3', label: 'Python3' },
		{ id: 'javascript', label: 'JavaScript' },
		{ id: 'java', label: 'Java' },
		{ id: 'cpp', label: 'C++' },
		{ id: 'c', label: 'C' },
		{ id: 'kotlin', label: 'Kotlin' },
		{ id: 'swift', label: 'Swift' },
		{ id: 'go', label: 'Go' }
	];

	function toggleLevel(lvl: number) {
		if (disabled) return;
		const current = filters.levels || [];
		let updated: number[];
		if (current.includes(lvl)) {
			updated = current.filter((l) => l !== lvl);
		} else {
			updated = [...current, lvl];
		}
		onFilterChange({ ...filters, levels: updated });
	}

	function toggleLanguage(langId: string) {
		if (disabled) return;
		const current = filters.languages || [];
		let updated: string[];
		if (current.includes(langId)) {
			updated = current.filter((l) => l !== langId);
		} else {
			updated = [...current, langId];
		}
		onFilterChange({ ...filters, languages: updated });
	}

	function setOrder(e: Event) {
		if (disabled) return;
		const val = (e.target as HTMLSelectElement).value as FilterOptions['order'];
		onFilterChange({ ...filters, order: val || undefined });
	}

	const activeFilterCount = $derived(
		(filters.levels?.length || 0) + (filters.languages?.length || 0) + (filters.order ? 1 : 0)
	);
</script>

<div class="glass-card rounded-2xl p-5 sm:p-6 mb-8 border border-[#F5D0C5]/10">
	<!-- Panel Header -->
	<div class="flex items-center justify-between pb-4 mb-5 border-b border-[#F5D0C5]/10">
		<div class="flex items-center gap-2.5">
			<div class="w-8 h-8 rounded-lg bg-[#D69F7E]/10 border border-[#D69F7E]/20 flex items-center justify-center text-[#D69F7E]">
				<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
				</svg>
			</div>
			<div>
				<h2 class="text-base font-bold text-[#F5D0C5] flex items-center gap-2">
					추첨 필터 설정
					{#if activeFilterCount > 0}
						<span class="px-2 py-0.5 text-xs font-semibold rounded-full bg-[#D69F7E]/20 text-[#D69F7E] border border-[#D69F7E]/30">
							{activeFilterCount}개 적용 중
						</span>
					{/if}
				</h2>
				<p class="text-xs text-[#F5D0C5]/50">원하는 난이도와 사용 언어를 선택하세요 (선택 해제 시 전체 대상)</p>
			</div>
		</div>

		{#if activeFilterCount > 0}
			<button
				onclick={onResetFilters}
				{disabled}
				class="inline-flex items-center gap-1.5 text-xs font-medium text-[#D69F7E] hover:text-[#F5D0C5] transition-colors disabled:opacity-50 cursor-pointer"
			>
				<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
				</svg>
				필터 초기화
			</button>
		{/if}
	</div>

	<!-- Levels Section -->
	<div class="space-y-4">
		<div>
			<span class="block text-xs font-semibold text-[#D69F7E] uppercase tracking-wider mb-2">
				난이도 (Levels)
			</span>
			<div class="flex flex-wrap gap-2">
				{#each ALL_LEVELS as level}
					{@const selected = filters.levels?.includes(level)}
					<button
						type="button"
						onclick={() => toggleLevel(level)}
						{disabled}
						class="transition-all duration-200 cursor-pointer rounded-full p-0.5 border text-xs font-medium ${
							selected
								? 'ring-2 ring-[#D69F7E] ring-offset-2 ring-offset-[#050609] scale-105'
								: 'opacity-60 hover:opacity-100 hover:scale-102 border-transparent'
						}"
					>
						<LevelBadge {level} size="md" />
					</button>
				{/each}
			</div>
		</div>

		<!-- Languages Section -->
		<div>
			<span class="block text-xs font-semibold text-[#D69F7E] uppercase tracking-wider mb-2">
				사용 언어 (Languages)
			</span>
			<div class="flex flex-wrap gap-2">
				{#each ALL_LANGUAGES as lang}
					{@const selected = filters.languages?.includes(lang.id)}
					<button
						type="button"
						onclick={() => toggleLanguage(lang.id)}
						{disabled}
						class="px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer border {selected
							? 'bg-[#D69F7E]/20 text-[#F5D0C5] border-[#D69F7E] shadow-sm shadow-[#D69F7E]/20 scale-105'
							: 'bg-[#F5D0C5]/5 text-[#F5D0C5]/70 border-[#F5D0C5]/10 hover:bg-[#F5D0C5]/10 hover:text-[#F5D0C5]'}"
					>
						{lang.label}
					</button>
				{/each}
			</div>
		</div>

		<!-- Order / Sort Section -->
		<div>
			<label for="order-select" class="block text-xs font-semibold text-[#D69F7E] uppercase tracking-wider mb-2">
				정렬 기준 (Order)
			</label>
			<select
				id="order-select"
				value={filters.order || ''}
				onchange={setOrder}
				{disabled}
				class="w-full sm:w-64 px-3.5 py-2 rounded-xl text-xs font-medium bg-[#050609] text-[#F5D0C5] border border-[#F5D0C5]/15 focus:border-[#D69F7E] focus:outline-none cursor-pointer"
			>
				<option value="">전체 무작위 (기본)</option>
				<option value="recent">최신 등록순</option>
				<option value="acceptance_desc">정답률 높은 순</option>
				<option value="acceptance_asc">정답률 낮은 순</option>
			</select>
		</div>
	</div>
</div>
