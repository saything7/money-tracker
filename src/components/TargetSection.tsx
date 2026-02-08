import React from 'react';
import { TargetSectionProps } from '../types/types';

const TargetSection: React.FC<TargetSectionProps> = ({
                                                         targetAmount,
                                                         currentAmount,
                                                         onUpdateTarget
                                                     }) => {
    const progressPercentage = Math.min(Math.round((currentAmount / targetAmount) * 100), 100);

    return (
        <section className="target-section">
            <h2>Цель</h2>
            <div className="target-display">
                <div className="progress-container">
                    <div
                        className="progress-bar"
                        style={{ width: `${progressPercentage}%` }}
                        role="progressbar"
                        aria-valuenow={progressPercentage}
                        aria-valuemin={0}
                        aria-valuemax={100}
                    >
                        {progressPercentage}%
                    </div>
                </div>

                {/* ВАЖНО: .progress-labels ВНЕ .progress-container */}
                <div className="progress-labels">
                    <span className="current-amount-label">{currentAmount.toLocaleString()} руб.</span>
                    <span className="target-amount-label">Цель: {targetAmount.toLocaleString()} руб.</span>
                </div>
            </div>
            <button onClick={onUpdateTarget}>
                <i className="fas fa-bullseye"></i> Изменить цель
            </button>
        </section>
    );
};

export default TargetSection;