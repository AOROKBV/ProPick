export const DEFAULT_LANGUAGES = ['cpp'];

/**
 * Toggles a language in the selected languages list.
 * Guarantees that at least one language remains selected (prevents deselecting the last language).
 */
export function toggleLanguageFilter(current: string[], langId: string): string[] {
	if (current.includes(langId)) {
		if (current.length <= 1) {
			// Cannot remove the last remaining language
			return current;
		}
		return current.filter((l) => l !== langId);
	}
	return [...current, langId];
}

/**
 * Ensures that the languages array contains at least one default language.
 */
export function ensureLanguages(languages?: string[]): string[] {
	if (!languages || languages.length === 0) {
		return DEFAULT_LANGUAGES;
	}
	return languages;
}
