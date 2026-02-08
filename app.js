const { useState, useEffect } = React;

function App() {
    // Состояния
    const [targetAmount, setTargetAmount] = useState(210000);
    const [currentAmount, setCurrentAmount] = useState(0);
    const [incomeAmount, setIncomeAmount] = useState('');
    const [incomeDescription, setIncomeDescription] = useState('');
    const [history, setHistory] = useState([]);

    // Загрузка данных из localStorage при загрузке
    useEffect(() => {
        const savedTarget = localStorage.getItem('targetAmount');
        const savedCurrent = localStorage.getItem('currentAmount');
        const savedHistory = localStorage.getItem('incomeHistory');

        if (savedTarget) setTargetAmount(parseInt(savedTarget));
        if (savedCurrent) setCurrentAmount(parseInt(savedCurrent));
        if (savedHistory) setHistory(JSON.parse(savedHistory));
    }, []);

    // Сохранение данных в localStorage при изменении
    useEffect(() => {
        localStorage.setItem('targetAmount', targetAmount);
        localStorage.setItem('currentAmount', currentAmount);
        localStorage.setItem('incomeHistory', JSON.stringify(history));
    }, [targetAmount, currentAmount, history]);

    // Добавление дохода
    const addIncome = () => {
        const amount = parseInt(incomeAmount);
        if (!amount || amount <= 0) {
            alert('Введите корректную сумму');
            return;
        }

        const newIncome = {
            id: Date.now(),
            amount: amount,
            description: incomeDescription || 'Без описания',
            date: new Date().toLocaleString('ru-RU')
        };

        setCurrentAmount(prev => prev + amount);
        setHistory(prev => [newIncome, ...prev]);
        setIncomeAmount('');
        setIncomeDescription('');
    };

    // Удаление дохода из истории
    const deleteIncome = (id, amount) => {
        if (window.confirm('Удалить этот доход?')) {
            setCurrentAmount(prev => prev - amount);
            setHistory(prev => prev.filter(item => item.id !== id));
        }
    };

    // Изменение цели
    const updateTarget = () => {
        const newTarget = prompt('Введите новую цель (руб.):', targetAmount);
        if (newTarget && !isNaN(newTarget) && newTarget > 0) {
            setTargetAmount(parseInt(newTarget));
        }
    };

    // Расчет процента выполнения
    const progressPercentage = Math.min(Math.round((currentAmount / targetAmount) * 100), 100);

    return React.createElement('div', null,
        React.createElement('h1', null,
            React.createElement('i', { className: 'fas fa-chart-line' }),
            ' Трекер доходов'
        ),

        React.createElement('section', { className: 'target-section' },
            React.createElement('h2', null, 'Цель'),
            React.createElement('div', { className: 'target-display' },
                React.createElement('div', { className: 'progress-container' },
                    React.createElement('div', {
                        className: 'progress-bar',
                        style: { width: `${progressPercentage}%` }
                    }, `${progressPercentage}%`)
                ),
                React.createElement('div', { className: 'progress-labels' },
                    React.createElement('span', { className: 'current-amount-label' },
                        `${currentAmount.toLocaleString()} руб.`
                    ),
                    React.createElement('span', { className: 'target-amount-label' },
                        `Цель: ${targetAmount.toLocaleString()} руб.`
                    )
                )
            ),
            React.createElement('button', {
                    onClick: updateTarget,
                    className: 'target-button'
                },
                React.createElement('i', { className: 'fas fa-bullseye' }),
                ' Изменить цель'
            )
        ),

        React.createElement('section', { className: 'add-income' },
            React.createElement('h2', null, 'Добавить доход'),
            React.createElement('div', { className: 'form-group' },
                React.createElement('label', { htmlFor: 'amount' }, 'Сумма (руб.)'),
                React.createElement('input', {
                    type: 'number',
                    id: 'amount',
                    value: incomeAmount,
                    onChange: (e) => setIncomeAmount(e.target.value),
                    placeholder: 'Например: 5000',
                    className: 'income-input'
                })
            ),
            React.createElement('div', { className: 'form-group' },
                React.createElement('label', { htmlFor: 'description' }, 'Описание (необязательно)'),
                React.createElement('textarea', {
                    id: 'description',
                    value: incomeDescription,
                    onChange: (e) => setIncomeDescription(e.target.value),
                    placeholder: 'Зарплата, фриланс, подарок...',
                    rows: '3',
                    className: 'description-textarea'
                })
            ),
            React.createElement('button', {
                    onClick: addIncome,
                    className: 'add-income-button'
                },
                React.createElement('i', { className: 'fas fa-plus-circle' }),
                ' Добавить доход'
            )
        ),

        React.createElement('section', { className: 'history-section' },
            React.createElement('h2', null, 'История доходов'),
            React.createElement('div', { className: 'total-income' },
                'Всего накоплено: ',
                React.createElement('span', { style: { color: '#2E7D32' } },
                    `${currentAmount.toLocaleString()} руб.`
                )
            ),
            React.createElement('div', { className: 'history-list' },
                history.length === 0
                    ? React.createElement('div', { className: 'empty-history' }, 'История доходов пуста')
                    : history.map(item =>
                        React.createElement('div', { key: item.id, className: 'history-item' },
                            React.createElement('div', { className: 'history-info' },
                                React.createElement('div', null, item.description),
                                React.createElement('div', { className: 'history-date' }, item.date)
                            ),
                            React.createElement('div', { className: 'history-amount' },
                                `+${item.amount.toLocaleString()} руб.`
                            ),
                            React.createElement('button', {
                                    className: 'delete-btn',
                                    onClick: () => deleteIncome(item.id, item.amount)
                                },
                                React.createElement('i', { className: 'fas fa-trash' })
                            )
                        )
                    )
            )
        )
    );
}

ReactDOM.render(React.createElement(App), document.getElementById('root'));