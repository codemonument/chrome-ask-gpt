import { signal } from '@preact/signals-core';

/**
 * Guide for Signals: https://www.npmjs.com/package/@preact/signals-core
 */

export const userLoggedIn = signal(false);

// export const loadingTabIds = signal<number[]>([])

/**
 * key == tabId
 */
export const loadingTabs = new Map<number, { isLoading: boolean, queryText }>();