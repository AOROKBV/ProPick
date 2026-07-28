<script lang="ts">
	let { level, size = 'md' }: { level: number; size?: 'sm' | 'md' | 'lg' } = $props();

	// Color mappings for Programmers levels (0..5)
	const levelStyles: Record<number, { bg: string; text: string; border: string }> = {
		0: { bg: 'bg-emerald-500/15', text: 'text-emerald-300', border: 'border-emerald-500/30' },
		1: { bg: 'bg-sky-500/15', text: 'text-sky-300', border: 'border-sky-500/30' },
		2: { bg: 'bg-amber-500/15', text: 'text-amber-300', border: 'border-amber-500/30' },
		3: { bg: 'bg-orange-500/15', text: 'text-orange-300', border: 'border-orange-500/30' },
		4: { bg: 'bg-rose-500/15', text: 'text-rose-300', border: 'border-rose-500/30' },
		5: { bg: 'bg-purple-500/15', text: 'text-purple-300', border: 'border-purple-500/30' }
	};

	const currentStyle = $derived(
		levelStyles[level] || { bg: 'bg-stone-500/15', text: 'text-stone-300', border: 'border-stone-500/30' }
	);

	const sizeClasses = $derived(
		size === 'sm'
			? 'px-2 py-0.5 text-xs'
			: size === 'lg'
				? 'px-4 py-1.5 text-sm font-bold'
				: 'px-3 py-1 text-xs font-semibold'
	);
</script>

<span
	class="inline-flex items-center gap-1.5 rounded-full border backdrop-blur-xs font-mono transition-all duration-200 {currentStyle.bg} {currentStyle.text} {currentStyle.border} {sizeClasses}"
>
	<span class="inline-block w-1.5 h-1.5 rounded-full bg-current"></span>
	Level {level}
</span>
