import React, { useState } from 'react';
import { AddIncomeProps } from '../types/types';

const AddIncome: React.FC<AddIncomeProps> = ({ onAddIncome }) => {
    const [amount, setAmount] = useState<string>('');
    const [description, setDescription] = useState<string>('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const parsedAmount = parseInt(amount);
        if (!parsedAmount || parsedAmount <= 0) {
            alert('Введите корректную сумму');
            return;
        }

        onAddIncome(parsedAmount, description || 'Без описания');
        setAmount('');
        setDescription('');
    };

    return (
        <section className="add-income">
            <h2>Добавить доход</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="amount">Сумма (руб.)</label>
                    <input
                        type="number"
                        id="amount"
                        value={amount}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAmount(e.target.value)}
                        placeholder="Например: 5000"
                        min="1"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Описание (необязательно)</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
                        placeholder="Зарплата, фриланс, подарок..."
                        rows={3}
                    />
                </div>
                <button type="submit">
                    <i className="fas fa-plus-circle"></i> Добавить доход
                </button>
            </form>
        </section>
    );
};

export default AddIncome;