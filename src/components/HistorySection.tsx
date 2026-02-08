import React from 'react';
import { HistorySectionProps, Income } from '../types/types';

const HistorySection: React.FC<HistorySectionProps> = ({
                                                           history,
                                                           currentAmount,
                                                           onDeleteIncome
                                                       }) => {
    const handleDelete = (id: number, amount: number) => {
        if (window.confirm('Удалить этот доход?')) {
            onDeleteIncome(id, amount);
        }
    };

    return (
        <section className="history-section">
            <h2>История доходов</h2>
            <div className="total-income">
                Всего накоплено: <span style={{color: '#2E7D32'}}>{currentAmount.toLocaleString()} руб.</span>
            </div>
            <div className="history-list">
                {history.length === 0 ? (
                    <div className="empty-history">История доходов пуста</div>
                ) : (
                    history.map((item: Income) => (
                        <div key={item.id} className="history-item">
                            <div className="history-info">
                                <div>{item.description}</div>
                                <div className="history-date">{item.date}</div>
                            </div>
                            <div className="history-amount">+{item.amount.toLocaleString()} руб.</div>
                            <button
                                className="delete-btn"
                                onClick={() => handleDelete(item.id, item.amount)}
                                aria-label={`Удалить доход "${item.description}"`}
                            >
                                <i className="fas fa-trash"></i>
                            </button>
                        </div>
                    ))
                )}
            </div>
        </section>
    );
};

export default HistorySection;