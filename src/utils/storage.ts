import { AppState } from '../types/types';

const STORAGE_KEYS = {
    TARGET: 'targetAmount',
    CURRENT: 'currentAmount',
    HISTORY: 'incomeHistory'
} as const;

export const loadState = (): AppState => {
    try {
        const targetAmount = localStorage.getItem(STORAGE_KEYS.TARGET);
        const currentAmount = localStorage.getItem(STORAGE_KEYS.CURRENT);
        const history = localStorage.getItem(STORAGE_KEYS.HISTORY);

        return {
            targetAmount: targetAmount ? parseInt(targetAmount) : 100000,
            currentAmount: currentAmount ? parseInt(currentAmount) : 0,
            history: history ? JSON.parse(history) : []
        };
    } catch (error) {
        console.error('Error loading state from localStorage:', error);
        return {
            targetAmount: 100000,
            currentAmount: 0,
            history: []
        };
    }
};

export const saveState = (state: Partial<AppState>): void => {
    try {
        if (state.targetAmount !== undefined) {
            localStorage.setItem(STORAGE_KEYS.TARGET, state.targetAmount.toString());
        }
        if (state.currentAmount !== undefined) {
            localStorage.setItem(STORAGE_KEYS.CURRENT, state.currentAmount.toString());
        }
        if (state.history !== undefined) {
            localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(state.history));
        }
    } catch (error) {
        console.error('Error saving state to localStorage:', error);
    }
};