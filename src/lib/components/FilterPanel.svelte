<script lang="ts">
	import type { FilterOptions } from '$lib/types';
	import LevelBadge from './LevelBadge.svelte';
	import {
		toggleLanguageFilter,
		toggleLevelFilter,
		selectLevelPreset,
		getLevelSummary,
		getLevelInfo,
		type LevelPreset
	} from '$lib/randomizer/filters';

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

	const presets: { id: LevelPreset; label: string }[] = [
		{ id: 'all', label: '전체 (Lv.0~5)' },
		{ id: 'beginner', label: '입문·기초 (Lv.0~1)' },
		{ id: 'intermediate', label: '중급·상급 (Lv.2~3)' },
		{ id: 'advanced', label: '고난도 (Lv.4~5)' }
	];

	function toggleLevel(lvl: number) {
		if (disabled) return;
		const updated = toggleLevelFilter(filters.levels || [], lvl);
		onFilterChange({ ...filters, levels: updated });
	}

	function handleApplyPreset(preset: LevelPreset) {
		if (disabled) return;
		const updatedLevels = selectLevelPreset(preset);
		onFilterChange({ ...filters, levels: updatedLevels });
	}

	function toggleLanguage(langId: string) {
		if (disabled) return;
		const current = filters.languages || [];
		const updated = toggleLanguageFilter(current, langId);
		onFilterChange({ ...filters, languages: updated });
	}

	const activeFilterCount = $derived(
		(filters.levels?.length || 0) + (filters.languages?.length || 0)
	);

	const levelSummary = $derived(getLevelSummary(filters.levels || []));
	
	// Helper to check if level is selected (empty array means all levels selected)
	const isLevelSelected = (lvl: number) => {
		if (!filters.levels || filters.levels.length === 0) return true;
		return filters.levels.includes(lvl);
	};
</script>

<div class="glass-card rounded-2xl p-5 sm:p-6 mb-8 border border-[#280003]/15 shadow-sm">
	<!-- Panel Header -->
	<div class="flex items-center justify-between pb-4 mb-5 border-b border-[#280003]/15">
		<div class="flex items-center gap-2.5">
			<div class="w-8 h-8 rounded-lg bg-[#280003]/10 border border-[#280003]/20 flex items-center justify-center text-[#280003]">
				<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
				</svg>
			</div>
			<div>
				<h2 class="text-base font-bold text-[#280003] flex items-center gap-2">
					추첨 필터 설정
					{#if activeFilterCount > 0}
						<span class="px-2 py-0.5 text-xs font-semibold rounded-full bg-[#002825] text-[#FEFEFA]">
							{activeFilterCount}개 적용 중
						</span>
					{/if}
				</h2>
				<p class="text-xs text-[#280003]/70">원하는 난이도와 사용 언어를 선택하세요 (언어는 최소 1개 이상 선택)</p>
			</div>
		</div>

		{#if activeFilterCount > 0}
			<button
				onclick={onResetFilters}
				{disabled}
				class="inline-flex items-center gap-1.5 text-xs font-medium text-[#280003] hover:text-[#002825] transition-colors disabled:opacity-50 cursor-pointer"
			>
				<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
				</svg>
				필터 초기화
			</button>
		{/if}
	</div>

	<!-- Levels Section -->
	<div class="space-y-5">
		<div>
			<div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
				<span class="text-xs font-semibold text-[#280003] uppercase tracking-wider flex items-center gap-1.5">
					<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
					</svg>
					난이도 선택 (Levels)
				</span>

				<!-- Quick Presets -->
				<div class="flex flex-wrap gap-1.5">
					<span class="text-[11px] text-[#280003]/60 self-center mr-1 hidden sm:inline">빠른 선택:</span>
					{#each presets as preset}
						<button
							type="button"
							onclick={() => handleApplyPreset(preset.id)}
							{disabled}
							class="px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all duration-150 border cursor-pointer bg-[#280003]/5 text-[#280003] border-[#280003]/15 hover:bg-[#002825]/10 hover:border-[#002825]/30 hover:text-[#002825] active:scale-95 disabled:opacity-50"
						>
							{preset.label}
						</button>
					{/each}
				</div>
			</div>

			<!-- Level Cards Grid -->
			<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5 mb-4">
				{#each ALL_LEVELS as level}
					{@const selected = isLevelSelected(level)}
					{@const info = getLevelInfo(level)}
					<button
						type="button"
						onclick={() => toggleLevel(level)}
						{disabled}
						class="relative flex flex-col p-3 rounded-xl border text-left transition-all duration-200 cursor-pointer transform hover:-translate-y-0.5 disabled:opacity-50 {selected
								? `bg-[#FEFEFA] ${info.borderClass} ring-2 ${info.activeRing} shadow-sm scale-102`
								: 'bg-[#280003]/5 border-[#280003]/15 opacity-60 hover:opacity-100 hover:border-[#280003]/30'}"
					>
						<!-- Top row inside card: Checkmark & LevelBadge -->
						<div class="flex items-center justify-between gap-1 mb-2">
							<LevelBadge {level} size="sm" {selected} />
							{#if selected}
								<span class="w-4 h-4 rounded-full bg-[#002825] text-[#FEFEFA] flex items-center justify-center text-[10px] font-bold">
									✓
								</span>
							{/if}
						</div>

						<!-- Level Title & Tag -->
						<div class="text-xs font-bold text-[#280003] mb-0.5">
							{info.name}
						</div>
						<div class="text-[10px] text-[#280003]/70 font-medium">
							{info.tag}
						</div>
					</button>
				{/each}
			</div>

			<!-- Selected Difficulty Summary Card -->
			<div class="p-3.5 sm:p-4 rounded-xl bg-[#FEFEFA] border border-[#280003]/20 shadow-xs transition-all">
				<div class="flex items-center justify-between gap-2 mb-1.5">
					<div class="flex items-center gap-2">
						<span class="inline-block w-2 h-2 rounded-full bg-[#002825]"></span>
						<h3 class="text-xs font-bold text-[#280003]">
							{levelSummary.title}
						</h3>
					</div>

					<!-- Visual Level Range Gauge Bar -->
					<div class="flex items-center gap-1 bg-[#FEFEFA] px-2 py-1 rounded-md border border-[#280003]/15">
						{#each ALL_LEVELS as lvl}
							{@const active = isLevelSelected(lvl)}
							{@const info = getLevelInfo(lvl)}
							<span
								class="w-2 h-2 rounded-full transition-all duration-300 {active
									? `${info.bgClass.replace('/15', '')} scale-110 ring-1 ring-current`
									: 'bg-[#280003]/20'}"
								title={`Lv.${lvl} ${info.name}: ${active ? '포함됨' : '제외됨'}`}
							></span>
						{/each}
					</div>
				</div>

				<p class="text-xs text-[#280003]/80 leading-relaxed">
					{levelSummary.description}
				</p>
			</div>
		</div>

		<!-- Languages Section -->
		<div>
			<span class="block text-xs font-semibold text-[#280003] uppercase tracking-wider mb-2">
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
							? 'bg-[#002825] text-[#FEFEFA] border-[#002825] scale-105 shadow-xs'
							: 'bg-[#280003]/10 text-[#280003] border-[#280003]/20 hover:bg-[#280003]/20'}"
					>
						{lang.label}
					</button>
				{/each}
			</div>
		</div>
	</div>
</div>
