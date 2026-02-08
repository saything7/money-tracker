export interface Income {
    id: number;
    amount: number;
    description: string;
    date: string;
}

export interface AppState {
    targetAmount: number;
    currentAmount: number;
    history: Income[];
}

export interface TargetSectionProps {
    targetAmount: number;
    currentAmount: number;
    onUpdateTarget: () => void;
}

export interface AddIncomeProps {
    onAddIncome: (amount: number, description: string) => void;
}

export interface HistorySectionProps {
    history: Income[];
    currentAmount: number;
    onDeleteIncome: (id: number, amount: number) => void;
}