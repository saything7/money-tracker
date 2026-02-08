import React, { useState, useEffect, useCallback } from 'react';
import { Income, AppState } from '../types/types';
import { loadState, saveState } from '../utils/storage';
import TargetSection from './TargetSection';
import AddIncome from './AddIncome';
import HistorySection from './HistorySection';

const App: React.FC = () => {
    const [state, setState] = useState<AppState>(() => loadState());

    // Сохранение в localStorage при изменении состояния
    useEffect(() => {
        saveState(state);
    }, [state]);

    // Добавление дохода
    const handleAddIncome = useCallback((amount: number, description: string) => {
        const newIncome: Income = {
            id: Date.now(),
            amount,
            description,
            date: new Date().toLocaleString('ru-RU')
        };

        setState(prev => ({
            ...prev,
            currentAmount: prev.currentAmount + amount,
            history: [newIncome, ...prev.history]
        }));
    }, []);

    // Удаление дохода
    const handleDeleteIncome = useCallback((id: number, amount: number) => {
        setState(prev => ({
            ...prev,
            currentAmount: prev.currentAmount - amount,
            history: prev.history.filter(item => item.id !== id)
        }));
    }, []);

    // Изменение цели
    const handleUpdateTarget = useCallback(() => {
        const newTarget = prompt('Введите новую цель (руб.):', state.targetAmount.toString());
        if (newTarget && !isNaN(parseInt(newTarget)) && parseInt(newTarget) > 0) {
            setState(prev => ({
                ...prev,
                targetAmount: parseInt(newTarget)
            }));
        }
    }, [state.targetAmount]);

    return (
        <div>
            <h1><i className="fas fa-chart-line"></i> Трекер доходов</h1>

            <TargetSection
                targetAmount={state.targetAmount}
                currentAmount={state.currentAmount}
                onUpdateTarget={handleUpdateTarget}
            />

            <AddIncome onAddIncome={handleAddIncome} />

            <HistorySection
                history={state.history}
                currentAmount={state.currentAmount}
                onDeleteIncome={handleDeleteIncome}
            />
        </div>
    );
};

export default App;