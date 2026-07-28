<script lang="ts">
	import { getLevelInfo } from '$lib/randomizer/filters';

	let {
		level,
		size = 'md',
		selected = true,
		showTag = false
	}: {
		level: number;
		size?: 'sm' | 'md' | 'lg';
		selected?: boolean;
		showTag?: boolean;
	} = $props();

	const info = $derived(getLevelInfo(level));

	const sizeClasses = $derived(
		size === 'sm'
			? 'px-2 py-0.5 text-[11px]'
			: size === 'lg'
				? 'px-4 py-1.5 text-sm font-bold'
				: 'px-3 py-1 text-xs font-semibold'
	);

	const dotSizeClass = $derived(size === 'sm' ? 'w-1.5 h-1.5' : size === 'lg' ? 'w-2.5 h-2.5' : 'w-2 h-2');
</script>

<span
	class="inline-flex items-center gap-1.5 rounded-full border font-mono transition-all duration-200 {sizeClasses} {selected
		? `${info.bgClass} ${info.textClass} ${info.borderClass} shadow-xs`
		: 'bg-[#280003]/5 text-[#280003]/40 border-[#280003]/15 opacity-60'}"
>
	{#if selected}
		<span class="inline-block {dotSizeClass} rounded-full bg-current animate-pulse"></span>
	{:else}
		<span class="inline-block {dotSizeClass} rounded-full bg-[#280003]/30"></span>
	{/if}
	
	<span>Level {level}</span>

	{#if showTag}
		<span class="text-[10px] px-1.5 py-0.2 rounded font-sans font-medium opacity-90 border border-current/20">
			{info.name}
		</span>
	{/if}
</span>
